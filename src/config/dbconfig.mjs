import mongoose from "mongoose";

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { dbName: "tp-sprint6" });
    console.log("Base de datos conectada exitosamente");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
    process.exit(1);
  }
};

export default connectDB;