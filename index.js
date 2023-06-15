import express from 'express'
import mongoose from 'mongoose';
import Ticket from './models/ticketmodel.js'
import path from 'path'
import { fileURLToPath } from 'url';
import hbs from 'hbs'


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, './templates')
const port = process.env.PORT || 3000;

app.use(express.json());
app.set("view engine", "hbs")
app.set("views", templatePath)

//public website
app.get("/", (req, res)=>{
    res.render("login")
})

app.post("/login", async (req, res)=>{
    const tickets = await Ticket.find({}).sort('-date').exec((err, docs) => {});
    res.render("dashboard", {tickets: tickets})
})

//add ticket entry
app.post("/ticket", async(req, res)=>{
    try {
        const ticket = await Ticket.create(req.body)
        res.status(200).json(ticket);
    }
    catch (error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
});

//get data from the database
app.get('/tickets', async(req, res)=>{
    try{
        const tickets = await Ticket.find({});
        res.status(200).json(tickets);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://admin:ert34563dfgert35@gamblingapi.tnvgjzb.mongodb.net/Gambling-API?retryWrites=true&w=majority')
        .then(()=>{
            console.log('connected to mongo db')
            app.listen(port, ()=>{
                console.log(`Server running in port: ${port}`);
            })
        })
        .catch((error)=>{
            console.log(error);
        })
