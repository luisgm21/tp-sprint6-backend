import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../src/config/dbconfig.mjs";
import User from "../src/models/userModel.mjs";

const name = process.env.ADMIN_NAME;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!name || !email || !password) {
  console.error("Faltan ADMIN_NAME, ADMIN_EMAIL o ADMIN_PASSWORD en .env");
  process.exit(1);
}

const run = async () => {
  await connectDB();

  const existing = await User.findOne({ email });

  if (!existing) {
    await User.create({
      name,
      email,
      password,
      role: "admin",
      isDeleted: false
    });
    console.log("Admin creado");
  } else {
    existing.name = name;
    existing.role = "admin";
    existing.isDeleted = false;
    existing.password = password;
    await existing.save();
    console.log("Admin actualizado");
  }

  await mongoose.connection.close();
};

run().catch(async (err) => {
  console.error(err);
  await mongoose.connection.close();
  process.exit(1);
});