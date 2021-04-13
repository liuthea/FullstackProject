const mongoose = require('mongoose');
const Product = require('./models/product')
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected!!!')
    })
    .catch(err => {
        console.log("ERROR")
    })

    const p = new Product({
        name:'grape',
        price:1.3,
        category:'fruit'
    })

    p.save()
        .then(m => console.log(m))
        .catch(err => console.log(err))

Product.insertMany([{name:"apple",price:1.5,category:'fruit'},
{name:"milk",price:2.1,category:'dairy'},
{name:"lettuce",price:1.2,category:'vegetable'}])
.then(m => console.log(m))
.catch(err => console.log(err))