import { Router } from "express";
import CartManager from '../CartManager.js';
 const cartsRouter = Router();

 export default cartsRouter;



 //GETS
cartsRouter.get('/',async(req,res)=>{
res.send(await cart.readCarts())

})


//POST
cartsRouter.post('/',async(req,res)=>{
   res.send(await cart.addCarts())
   console.log('exitoso');
})


 const cart = new CartManager()