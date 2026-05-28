import express from "express";
import cors from "cors";



import router from "./routes/index.mjs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
	res.redirect('/api');
});

app.use("/api", router);

export default app;