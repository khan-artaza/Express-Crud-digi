import 'dotenv/config'
import express from 'express'

const app = express()
const port  = process.env.PORT || 3000;

app.use(express.json())

let teaData = []
let nextId = 1

//add a new tea
app.post("/teas", (req, res)=>{
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get("/teas", (req,res)=>{
    res.status(200).send(teaData)
})

//get a tea with id
app.get("/teas/:id", (req,res)=>{
    const tea =  teaData.find((t)=> t.id === parseInt(req.params.id))

    if(!tea){
        res.status(404).send("Tea not found!")
    }
    res.status(200).send(tea)
})

//update tea
app.put("/teas/:id", (req,res)=>{
    const tID = parseInt(req.params.id)
    const teaU =  teaData.find((t)=> t.id === tID)

    if(!teaU){
        res.status(400).send("tea not found!!")
    }
    const {name , price} = req.body
    teaU.name = name
    teaU.price = price

    res.status(200).send(`Upadated successfully! tea with ${tID}` , teaU)
})

//delete tea
app.delete("/teas/:id", (req, res)=>{
    console.log("delete")
    console.log(req.params.id)

    const tID = parseInt(req.params.id)
    const index =  teaData.findIndex((t)=> t.id === tID)

    if(index < 0){
        return res.status(404).send("tea not found!")
    }
    teaData.splice(index, 1);
    res.status(200).send('deleted')
})


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port} ...`);
})