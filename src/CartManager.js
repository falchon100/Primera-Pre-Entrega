import fs from 'fs'

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
        carts:[]
    }
    cart.push(nuevoCarrito)
        await fs.promises.writeFile(this.path,JSON.stringify(cart))  
        return {status:'Exitoso',msg:'Se agrego correctamente'}   
    }


    async readCarts(){
        let cart= await fs.promises.readFile(this.path,"utf-8")
        return JSON.parse(cart)
    }


}