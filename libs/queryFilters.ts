/**
 * Lista de filtros globales para las consultas.
 * En el objeto se debe especificar el modelo y los filtros que se aplicaran a las consultas junto con los includes
 * como si se estuviera haciendo una consulta en prisma.
 * @example Driver: {
                where: {
                    enabled: true,
                    user: {
                        phoneNumberConfirmed: true,
                    },
                },
                include: {
                    user: true,
                },
            },
 */
export default {
  // Driver: {
  //   where: {
  //     enabled: true,
  //     user: {
  //       phoneNumberConfirmed: true,
  //     },
  //   },
  //   include: {
  //     user: true,
  //   },
  // },
  User: {
    // where: {
    //   phoneNumberConfirmed: true,
    // },
  },
} as const;
