import express from "express";
import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";

const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(port, () => console.log("creando servidor"));

app.get("/", (req, res) => {
  res.send("Bienvenido!💻");
});
