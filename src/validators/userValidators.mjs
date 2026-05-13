import { check } from "express-validator";


const userValidationRules = () => {
  return [
    check("name").notEmpty().withMessage("Name es requerido"),
    check("email").isEmail().withMessage("Email válido es requerido"),
    check("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
    .custom((value, { req }) => {
      if (value !== "admin" && value !== "user" && value !== "student" && value !== "teacher") {
        throw new Error("Debe ser un rol válido'");
      }
      return true;
    }),
  ];
}