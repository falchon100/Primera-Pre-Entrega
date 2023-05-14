import fs from 'fs'
import ProductManager from './ProductManager.js';

const productAll = new ProductManager;



export default class CartManager{
    constructor(){
        this.path="./carts.json";
    }
//METODO PARA GENERAR ID
    generarId(){
     return Date.now();
    }

    async addCarts(){
    let cart= await this.readCarts() 
    let nuevoCarrito ={
        id:this.generarId(),
        products:[],
    }
    cart.push(nuevoCarrito)
        await fs.promises.writeFile(this.path,JSON.stringify(cart))  
        return {status:'Exitoso',msg:'Se agrego correctamente'}   
    }


    async readCarts(){
        let cart= await fs.promises.readFile(this.path,"utf-8")
        return JSON.parse(cart)
    }


    async  getCartById(id){
        let cart = await this.readCarts()
        let cartEncontrado = cart.find(elem=>elem.id == id)
           if (cartEncontrado){
            return {status: "Exitoso", cartEncontrado};
           }else{
           return {status: "No se encontro el carrito"};
           }
        }  


    async addProductToCart(cid,pid){
    //VERIFICO SI EXISTE EL PRODUCTO
/*         let producto =await  productAll.readProducts()
        let indiceProd = producto.findIndex(prod=>prod.id==pid)
        if (indiceProd==-1){
            return {status:'no existe ese producto'}
        } */

        //VERIFICO SI EXISTE EL CARRITO
    let carritos = await this.readCarts()
    let index = carritos.findIndex(cart =>cart.id== cid)
    if (index ==-1){
      return {status:'no existe ese carrito'}
    }

    if (carritos[index].products.some(prod=>prod.id==pid)){
        console.log(carritos[index].products[0].quantity);
        let variable = carritos[index].products.findIndex(prod=>prod.id == pid)
        carritos[index].products[variable].quantity++
        await fs.promises.writeFile(this.path,JSON.stringify(carritos)) 
    }
    else{
        carritos[index].products.push({
            id:pid,
            quantity:1
        }
        )
    }
    

    await fs.promises.writeFile(this.path,JSON.stringify(carritos))  
    return carritos[index]
}

/*  */
}