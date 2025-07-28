const express=require('express');
const app=express();
const port=5000;



app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello Student Guide backend is running");
})


app.listen(port,()=>{
    console.log(`Server is burning 🔥 coal at port ${port}`);
})