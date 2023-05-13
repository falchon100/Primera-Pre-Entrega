import fs from 'fs'

export default class ProductManager{
    constructor(){
    this.products = [];
    this.path="./DesafioClase2.txt";
    this.idNumber=[];
    }

async readProducts (){
    let producto= await fs.promises.readFile(this.path,"utf-8")
    return JSON.parse(producto)
}


// metodo para agregar productos y validacion si es que el codigo ya esta ingresado
    async addProduct(title,description,code,price,stock,category,thumbnails){
        if (!title||!description||!code||!price||!stock||!category){
        return {status:'Denegado',msg:'Debe colocar todos los campos'} ;
        }
        else{
            let nuevoProducto = {
                id:await this.idGenerator(),
                title,
                description,
                code,
                price,
                status:true,
                stock,
                category,
                thumbnails,
            }
            this.idNumber.push(nuevoProducto)
            let producto= await this.readProducts()
            if (producto.length==0){
                this.products.push(nuevoProducto)
                await fs.promises.writeFile(this.path,JSON.stringify(this.products))
                this.idNumber=[]
                return'Se agrego correctamente su producto'
            }else{
                if (producto.find(ele=>ele.code==code)){
           return `\n No se pudo agrega el producto,ya que el codigo "${code}" ya ha sido ingresado`}
                else{
                    producto.push(nuevoProducto)
                    console.log(producto);
                    await fs.promises.writeFile(this.path,JSON.stringify(producto))
                    this.idNumber=[]
                    return'Se agrego correctamente su producto'
                }
            }
        }
    }

    

// Genero un id autoincrementable con el largo del producto
   async idGenerator(){
    let producto= await this.readProducts()  
    let idNumber = this.idNumber
    let resultado = producto.length+ idNumber.length+1;
    return resultado;
    }

//Metodo para Mostrar los productos actuales
   async getProducts(){
    let producto = await this.readProducts()
    return console.log(producto);
    }

// Busco en el array de productos si hay un producto con esa id y lo devuelvo o sino Not Found
async  getProductById(id){
    let producto = await this.readProducts()
    let productoEncontrado = producto.find(elem=>elem.id == id)
       if (productoEncontrado){
        console.log("\n --------------El producto encontrado es :------------");
        console.log(productoEncontrado);
        return productoEncontrado
       }else{
       return {status: "No se encontro el producto"};
       }
    }  


  async  updateProduct(id,producto){
    let productOld= await this.readProducts()
    let indice= productOld.findIndex(producto => producto.id === id)
    if (indice !== -1){
        productOld[indice].title = producto.title
        productOld[indice].description = producto.description
        productOld[indice].code = producto.code
        productOld[indice].price = producto.price
        productOld[indice].status = producto.status
        productOld[indice].stock = producto.stock
        productOld[indice].category = producto.category
        productOld[indice].thumbnails=producto.thumbnails
    await fs.promises.writeFile(this.path, JSON.stringify(productOld))
    return {status:'producto actualizado'};
    }else{
        return 'no existe'
    }
    }

   async deleteProduct(id){
    //Leo el archivo y el objeto lo guardo en productoEncontrado
    let producto= await fs.promises.readFile(this.path,"utf-8")
    let productoEncontrados = JSON.parse(producto)
    //recorro el array de productos y si encuentro uno con el mismo id , lo borro y muestro el indice que borre
    productoEncontrados.forEach((elemento,index)=>{
        if(elemento.id==id){
            productoEncontrados.splice(index,1)
        }else{
            return{status:'Negado',payload:`no se ha encontrado`}
        }
     })
     //Envio el array de productos actualizados al archivo
   await fs.promises.writeFile(this.path,JSON.stringify(productoEncontrados))
   return {status :'exitoso'}
}
}
