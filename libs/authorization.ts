import { RequestHandler } from "express";
import { verifyAccessToken } from "../src/auth/utils";

export function authorize(protect: boolean, role: string[]): RequestHandler {
  return async (req, res, next) => {
    if (!protect) return next();

    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No se encuentra el token" });
    }

    try {
      const payload = await verifyAccessToken(token);

      if (role.length && !role.includes(payload._role)) {
        return res.status(401).json({ message: "No autorizado" });
      }

      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token Invalido" });
    }
  };
}

//add user to request object
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
