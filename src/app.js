import express from 'express'
import cartsRouter from './routes/carts.js'
import productsRouter from './routes/products.js'

const app = express()
const port = 8080;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)

app.listen(port,()=>console.log('creando servidor'))











// DELETE 
app.delete('/products',async(req,res)=>{
    let idProduct =req.body.id;
producto.deleteProduct(idProduct)
res.send({status:'exitoso',payload:idProduct})
})
// PUTT
app.put('/products',async(req,res)=>{
    let productoo = req.body;
    let id= req.body.id;

 producto.updateProduct(id,productoo)
 res.send({status:'exitoso',payload:id})
})


