import { Router } from "express";
import ProductManager from '../ProductManager.js';
 const cartsRouter = Router();

 export default cartsRouter;

 // GETS
 cartsRouter.get('/',async (req,res)=>{
    let limit = req.query.limit;
    let productos = await producto.readProducts();
    limit?res.send(productos.slice(0,limit)):res.send(productos)
 })

 cartsRouter.get('/:pid',async(req,res)=>{
    let productoId= await producto.getProductById(req.params.pid)
    productoId?res.send(productoId):res.send('no se encontro el producto')
})


 const producto = new ProductManager()