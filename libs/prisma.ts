import { PrismaClient } from "@prisma/client";
import filters from "./queryFilters";
const prismaClient = new PrismaClient();

function main() {
  /*
   * Soft delete
   * Ref: https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware
   */
  prismaClient.$use(async (params, next) => {
    switch (params.action) {
      case "delete":
        //@ts-ignore

        if (params.action["delete"]) {
          params.action = "update";
          //@ts-ignore

          params.action["delete"] = true;
        }
        break;
      case "deleteMany":
        params.action = "updateMany";
        if (params.args.data) {
          params.args.data["deleted"] = true;
        } else if (params.args["data"]) {
          params.args["data"] = { deleted: true };
        }
      default:
        break;
    }

    return await next(params);
  });

  /*
   * Logica de Query Filters (Filtros Globales)
   * Ref: https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware#step-3-optionally-prevent-readupdate-of-soft-deleted-records
   */
  prismaClient.$use(async (params, next) => {
    try {
      //@ts-ignore
      const queryFilters = filters[params.model];
      console.log({ queryFilters });
      // Si no se agregaron reglas de filtro para el modelo, se ejecuta la consulta sin filtros
      if (!queryFilters) {
        return await next(params);
      }

      params.action = ["findFirst", "findUnique"].includes(params.action)
        ? "findFirst"
        : params.action;
      params.action = ["update"].includes(params.action)
        ? "updateMany"
        : params.action;

      const include = {
        ...params.args.include,
        ...queryFilters.include,
      };
      const where = {
        ...params.args.where,
        ...queryFilters.where,
      };
      params.args = {
        ...params.args,
        where: Object.keys(where).length ? where : undefined,
        //No se puede mandar un objeto vacio en el include, si es asi debe ir undefined
        include: Object.keys(include).length ? include : undefined,
      };

      console.log({ include: params.args.include, where: params.args.where });

      return await next(params);
    } catch (error) {
      console.log(error);
      throw error;
      // next(params);
    }
  });
}

main();

// declare module "@prisma/client" {
//   interface PrismaClient {
//     /**
//      * Ignora los filtros globales de las consultas, se puede usar para obtener los datos de un registro eliminado o deshabilitado
//      * @returns PrismaClient
//      * @example prisma.$ignoreQueryFilters().driver.findFirst({ where: { id: 1 } })
//      */
//     $ignoreQueryFilters(): PrismaClient;
//   }
// }

// PrismaClient.prototype.$ignoreQueryFilters = function () {
//   prismaClient.$use(async (params, next) => {
//     //@ts-ignore
//     const { where } = filters[params.model];
//     params.action = ["findFirst", "findUnique"].includes(params.action)
//       ? "findFirst"
//       : params.action;
//     params.action = ["update"].includes(params.action)
//       ? "updateMany"
//       : params.action;
//     console.log({ where });
//     Object.keys(where).forEach((key) => {
//       console.log({ key });
//       delete params.args.where[key];
//     });

//     console.log({ IQF: params, where: params.args.where });

//     return await next(params);
//   });

//   return prismaClient;
// };

export default prismaClient;
