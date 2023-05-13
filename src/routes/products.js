import { Router } from "express";
import ProductManager from '../ProductManager.js';
const productsRouter = Router();

// GETS
productsRouter.get('/',async(req,res)=>{
    let limit = req.query.limit;
    let productos = await producto.readProducts();
    limit?res.send(productos.slice(0,limit)):res.send(productos)
    })
    
    productsRouter.get('/:pid',async(req,res)=>{
        let productoId= await producto.getProductById(req.params.pid)
        productoId?res.send(productoId):res.send('no se encontro el producto')
    })

// POST
    productsRouter.post('/',async (req,res)=>{
        let {title,description,code,price,stock,category,thumbnails} = req.body;
    res.send(await producto.addProduct(title,description,code,price,stock,category,thumbnails)) 
}
)


// DELETE 
productsRouter.delete('/',async(req,res)=>{
    let id =req.body.id;
producto.deleteProduct(id)
res.send({status:'exitoso',payload:`se ha eliminado el id numero ${id} `})
})

// PUTT
productsRouter.put('/',async(req,res)=>{
    let productoo = req.body;
    let id= req.body.id;

 producto.updateProduct(id,productoo)
 res.send({status:'Producto Actualizado',payload:id})
})



let producto= new ProductManager()

export default productsRouter;


