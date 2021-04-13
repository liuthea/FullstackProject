const express = require('express')
const Product = require('./models/product')
const app = express();
const path = require('path')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.listen(3000,()=>{
    console.log('ON PORT 3000!')
})
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected!!!')
    })
    .catch(err => {
        console.log("ERROR")
    })

app.get('/products/new',(req,res)=>{
        res.render('products/new')
    })

app.get('/products', async (req,res)=>{
    const {category} = req.query;
    if(category){
        const products = await Product.find({category})
        res.render('products/index',{products,category})
    }
   else {
    const products = await Product.find({})
    res.render('products/index',{products,category:"All"})
   }
})

app.get('/products/:id',async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/show',{product})
})

app.post('/products',async (req,res)=>{
    const newProduct=new Product(req.body);
   await newProduct.save()
   res.redirect('/products')
})

app.get('/products/:id/edit', async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/edit',{product})
})

app.put('/products/:id', async (req,res) =>{
    const {id} = req.params;   
    const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    res.redirect(`/products/${id}`)
})

app.delete('/products/:id/',async (req,res) => {
    const {id}  = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})