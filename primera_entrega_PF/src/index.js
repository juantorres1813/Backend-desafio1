import express from "express";
import { config } from "./config/index.js";
import { ProductRouter, CartRouter } from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use('*', (req, res) => {
	const path = req.params;
	const method = req.method;
	res.send({ error: -2, descripcion: `ruta '${path[0]}' método '${method}' no implementada` });
});

const server = app.listen(config.SERVER.PORT, () =>
    console.log(`Server running on port ${server.address().port}`)
);