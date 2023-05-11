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
    let productos= await producto.readProducts();
    productos.find(prod=>prod.id==req.params.pid)?res.send(productos.filter(prod=>prod.id==req.params.pid)):res.send('no se encontro el producto')
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
    let idProduct =req.body.id;
producto.deleteProduct(idProduct)
res.send({status:'exitoso',payload:idProduct})
})

// PUTT
productsRouter.put('/',async(req,res)=>{
    let productoo = req.body;
    let id= req.body.id;

 producto.updateProduct(id,productoo)
 res.send({status:'exitoso',payload:id})
})



let producto= new ProductManager()

export default productsRouter;


