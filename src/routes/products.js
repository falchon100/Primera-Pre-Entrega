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
        try {
            let {title,description,code,price,status,stock,category,thumbnails} = req.body;
            if (!title||!description||!code||!price||!status||!stock||!category){
    res.status(400).send({status:'error',error:'falta parametro'})
            }
         producto.addProduct(title,description,code,price,status,stock,category,thumbnails) 
        res.send({status:'exitoso',payload:title})
        } catch (error) {
            console.log(error);
        }
    
    })


// DELETE 
productsRouter.delete('/',async(req,res)=>{
    let id =req.body.id;
producto.deleteProduct(id)
res.send({status:'exitoso',payload:`se ha eliminado el id ${id}`})
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


