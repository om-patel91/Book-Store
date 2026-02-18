import express from "express";
import {Book} from "../models/bookModels.js"

const router = express.Router();

//Route for save a new Book
router.post("", async(req,res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishedYear){
            return res.status(400).json({message:"Please send aa required fields :title, author, publishYear"});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear,
        }
        
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
})

//Route for get all Books from databse 
router.get("",async (req,res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json( 
            {count: books.length,
            data: books} 
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({messgae: error.message});
    }
})

//Route for get one Books from databse by id 
router.get("/:id",async (req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({messgae: error.message});
    }
})

//Route for update a Book
router.put("/:id",async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishedYear){
            return res.status(400).send({
                message: "send all required fields : title, author, publishedYear",
            })
        }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({message: "Book not Found"});
        }

        return res.status(200).json({message: "Book updated successfully"});

    } catch (error) {
        console.log(error.message);
        response.status(500).send(({message: error.message}));
    }
})

//Route for delete a Book
router.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: "Book not found"}); 
        }

        return res.status(200).send({message:"Book deleted Successfully"})
        
    } catch (error) {
       console.log(error.message);
       res.status(500).send({message: error.message}); 
    }
})

export default router;