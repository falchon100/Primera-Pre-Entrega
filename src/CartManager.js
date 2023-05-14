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
        quantity:0
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
    console.log(carritos);
    let index = carritos.findIndex(cart =>cart.id== cid)
    if (index ==-1){
      return {status:'no existe ese carrito'}

    //carritos[index]= { id: 1684079870754, products: [], quantity: 0 }
    
    }else{
        console.log(carritos[index].products.length== 0);
    if(carritos[index].products.length== 0){
    carritos[index].products= pid;
    carritos[index].quantity= 1
    await fs.promises.writeFile(this.path,JSON.stringify(carritos))  
    }else{
        
        console.log('entra aca');
        carritos[index].quantity++  
        await fs.promises.writeFile(this.path,JSON.stringify(carritos))  
    }
    console.log(carritos[index]);
      /*   carritos[index].products=pid
        console.log(carritos[index].products)
        carritos[index].quantity++
       ; */
/*         carritos[index].products?console.log('si'):console.log('no');
        carritos[index].products=pid;
        carritos[index].quantity++
        console.log(carritos[index]); */


        // ACA ME QUEDE 
        return carritos
            console.log('aca solo debo pushear');
        /* carritos[index].product.push(pid) */
        
    }
    await fs.promises.writeFile(this.path,JSON.stringify(carritos))  
    return carritos[index]
    }

}