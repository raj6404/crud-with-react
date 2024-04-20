import express from "express";
import {Book} from "../models/bookModel.js";
const router = express.Router();


// Route for Save a New Book
router.post('/', async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
           return res.status(404).send({message:"Send All REquird Fields"});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch(err){
        console.log('Error Creating Book');
        res.status(500).send({message:err.message});
    }
});

//Route for Get All Books from Database
router.get('/',async(req,res)=>{
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        });
    }
    catch(err){
        console.log('Cannot Get Books');
        res.status((500).send({message:err.message}));
    }

});

//Route for Get a Book By ID from Database
router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({
            data:book
        });
    }
    catch(err){
        console.log('Cannot Get Books');
        res.status(500).send({message:err.message});
    }

});

//Route for Update a Book By ID from Database
router.put('/:id',async(req,res)=>{
    try{
       if(!req.body.title || !req.body.author || !req.body.publishYear){
        return res.status(400).send({message:"All Fields ar Required!"});
       }
       const {id} = req.params;
       const result = await  Book.findByIdAndUpdate(id,req.body);

       if(!result){
        return res.status(404).json({message:"Cannt found Book"});
       }
       return res.status(200).send({message:"Books Updatd Successfully"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }

});

//Route for Delete a Book By ID from Database
router.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:"Book Not Found"});
        }
        return res.status(200).send({message:"Book Deleted Successfully"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }

});

export default router;