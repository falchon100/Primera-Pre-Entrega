import { Router } from "express";
import CartManager from '../CartManager.js';
 const cartsRouter = Router();

 export default cartsRouter;



 //GETS
cartsRouter.get('/',async(req,res)=>{
res.send(await cart.readCarts())
})

cartsRouter.get('/:cid',async(req,res)=>{
   let id = req.params.cid
   res.send(await cart.getCartById(id))
})


//POST
cartsRouter.post('/',async(req,res)=>{
   res.send(await cart.addCarts())
})

cartsRouter.post('/:cid/product/:pid', async (req,res)=>{
   let cartId=req.params.cid;
   let productId= req.params.pid;
   res.send(await cart.addProductToCart(cartId,productId))
})

 const cart = new CartManager()