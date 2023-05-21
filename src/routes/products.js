import { Router } from "express";
import ProductManager from "../ProductManager.js";
const productsRouter = Router();

// GETS
productsRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  const productos = await producto.readProducts();
  limit ? res.send(productos.slice(0, limit)) : res.send(productos);
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const response = await producto.getProductById(id);
    if (response.status !== "Exitoso") {
      return res.status(404).send(response);
    } else {
      res.status(200).send(response);
    }
  } catch (error) {
    console.log(error);
  }
});

// POST
productsRouter.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  res.send(
    await producto.addProduct(
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails
    )
  );
});

// DELETE
productsRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  res.send(await producto.deleteProduct(id));
});

// PUTT
productsRouter.put("/", async (req, res) => {
  const productoo = req.body;
  const { id } = req.body;
  res.send(await producto.updateProduct(id, productoo));
});

//inicializo la instancia producto
const producto = new ProductManager();

export default productsRouter;
