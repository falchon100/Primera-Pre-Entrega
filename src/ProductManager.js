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
    async addProduct(title,description,code,price,status,stock,category,thumbnails){
        if (!title||!description||!code||!price||!status||!stock||!category){
        console.log('\n No se pudo agregar el producto. Debera completar todos los campos')}
        else{
            let nuevoProducto = {
                id:await this.idGenerator(),
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails,
            }
            this.idNumber.push(nuevoProducto)
            let producto= await this.readProducts()
            if (producto.length==0){
                this.products.push(nuevoProducto)
                await fs.promises.writeFile(this.path,JSON.stringify(this.products))
            }else{
                if (producto.find(ele=>ele.code==code)){
                console.log(`\n No se pudo agrega el producto,ya que el codigo "${code}" ya ha sido ingresado`)}
                else{
                    producto.push(nuevoProducto)
                    await fs.promises.writeFile(this.path,JSON.stringify(producto))
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
        console.log("not Found");
        return undefined
       }
    }  


  async  updateProduct(id,producto){
    let productOld= await this.readProducts()
    let indice= productOld.findIndex(producto => producto.id === id)
    if (indice !== -1){
        productOld[indice].title = producto.title
        productOld[indice].description = producto.description
        productOld[indice].price = producto.price
        productOld[indice].code = producto.code
        productOld[indice].stock = producto.stock
    }
    await fs.promises.writeFile(this.path, JSON.stringify(productOld))
    return console.log(`Producto actualizado`);
    }

   async deleteProduct(id){
    //Leo el archivo y el objeto lo guardo en productoEncontrado
    let producto2= await fs.promises.readFile(this.path,"utf-8")
    let productoEncontrado = JSON.parse(producto2)
    //recorro el array de productos y si encuentro uno con el mismo id , lo borro y muestro el indice que borre
    productoEncontrado.forEach((elemento,index)=>{
        if(elemento.id==id){
            productoEncontrado.splice(index,1)
            console.log(`se elimino el id "${id}" de la lista`);
        }
     })
     //Envio el array de productos actualizados al archivo
   await fs.promises.writeFile(this.path,JSON.stringify(productoEncontrado))
    }
}

//Se creará una instancia de la clase “ProductManager”
let producto= new ProductManager()

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    /* producto.getProducts() */
   /*  producto.addProduct('Capuchino',"Italiano",400,500,true,2,"bebida","./Capuchino"); */
/*      producto.addProduct('Cafe',"Cafe expreso",200,"./Cafe","coffe",10);
     producto.addProduct('Capuchino',"Capuchino Italiano",400,"./Capuchino","Capu",5);
     producto.addProduct('Te',"Te Caliente",250,"./Te","Tecito",30);
     producto.addProduct('Submarino',"Con chocolate",500,"./Sub","Subma",5);
     producto.addProduct('Latte',"con canela",600,"./Latte","Late",7);
     producto.addProduct('Frapuchino',"con Helado",600,"./frapu","Frap",4);
     producto.addProduct('Lagrima',"Poco cafe",400,"./lagrima","lagri",6); 
     producto.addProduct('Moca',"Moca Blanco",500,"./Moca","Moca",3);
     producto.addProduct('Doble expresso',"Doble",400,"./expresso","doblee",10);
     producto.addProduct('Americano',"Americano",300,"./Americano","americ",5); 
    /* producto.getProducts() */
    
  /*   producto.getProductById(2) */

  /*   producto.updateProduct(2,{
    title: 'tres',
    description: 'tres',
    price: 3,
    thumbnail: 'tres',
    code: 'tres',
    stock: 3
  }) 
 */
    /* producto.deleteProduct(1) */

  