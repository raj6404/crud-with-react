import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";


const app = express();

// MiddleWare for for Parsing request body
app.use(express.json());

// MiddleWare for handling cors policy
// option-1: Allow all Origins with default of cors(*)
app.use(cors());

// option-2: Allow custom Origins
// app.use(cors({
//     origin:'http://localhost:5555',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }));

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('Hello Node');
});

app.use('/books',booksRoute);

// Connect Mongo DB
mongoose.connect(mongoDBURL).then(()=>{
console.log('Database Connected');
app.listen(PORT,()=>{
    console.log(`Server Running on Port: ${PORT}`);
});
}).catch(()=>{
    console.log('Database Error')
})