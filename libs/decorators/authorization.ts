import { Role } from "@prisma/client";

/**
 * Protege las rutas de los usuarios que no esten logueados y valida por roles si es necesario.
 * @param role - Roles permitidos para acceder a la ruta.
 * @returns {Function}
 * @example @Protected([Role.ADMIN])
 */
export function Protected(role: Role[] = []): Function {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("routeProtected", true, target, propertyKey);
    Reflect.defineMetadata("routeRole", role, target, propertyKey);
  };
}
