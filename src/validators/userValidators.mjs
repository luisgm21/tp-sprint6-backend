import { check } from "express-validator";


export const userValidationRules = () => {
  return [
    check("name").notEmpty().withMessage("Name es requerido"),
    check("email").isEmail().withMessage("Email válido es requerido"),
    check("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    check("role").custom((value, { req }) => {
      if (value !== "admin" && value !== "user" && value !== "student" && value !== "teacher") {
        throw new Error("Debe ser un rol válido'");
      }
      return true;
    }),
  ];
}

export const userUpdateValidationRules = () => {
  return [
    check("name").optional().notEmpty().withMessage("Name es requerido"),
    check("email").optional().isEmail().withMessage("Email válido es requerido"),
    check("password").optional().custom((value, { req }) => {
      if (req.body.hasOwnProperty("password")) {
        throw new Error("No se puede actualizar la contraseña a través de esta ruta");
      }
      return true;
    }),
    check("role").optional().custom((value, { req }) => {
      if (value !== "admin" && value !== "user" && value !== "student" && value !== "teacher") {
        throw new Error("Debe ser un rol válido'");
      }
      return true;
    }),
  ];
}