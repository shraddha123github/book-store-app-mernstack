const Book = require("./book.model");

const postABook = async(req,res)=>{

    try{
        const newBook=await Book({...req.body})
        await newBook.save();
        res.status(200).send({message:"Book Posted Successfully", book:newBook})

    }catch(error)
    {
        console.error("Erroe creating a book", error)
        res.status(500).send({message:"failed to create book"})
    }
}

const getAllBooks = async(req,res)=>{
    
    try{
       const books=await Book.find().sort({createdAt: -1});
       res.status(200).send(books)

    } catch(error){
        console.error("Erroe fetching a book", error)
        res.status(500).send({message:"failed to fetch book"})
    }

}
const getSingleBook = async(req,res)=>{
    try{
       const {id}=req.params;
       const book = await Book.findById(id);
       if(!book)
       {
        res.status(404).send({message:"Book not found"})
       }
       res.status(200).send(book)

    } catch(error){
        console.error("Error fetching a book", error)
        res.status(500).send({message:"failed to fetch book"})
    }
}
const updateBook=async(req,res)=>{
    try{
       const {id}=req.params;
       const updatedBook = await Book.findByIdAndUpdate(id, req.body,{new:true});
       if(!updatedBook)
       {
        res.status(404).send({message:"Book not found"})
       }
       res.status(200).send({
        message:"Book updated successfully",
        book: updatedBook
       })

    } catch(error){
        console.error("Error failed to update book", error)
        res.status(500).send({message:"failed to fetch book"})
    }
}
const deleteABook=async(req,res)=>{
    try{
        const {id} = req.params;
        const daleteBook =await Book.findByIdAndDelete(id);
        if(!daleteBook)
       {
        res.status(404).send({message:"Book not found"})
       }
       res.status(200).send({
        message:"Book deleted successfully",
        book: daleteBook
       })
    }catch(error)
    {
     console.error("Error deleteing book", error)
     res.status(500).send({message:"failed to delete book"})   
    }
}

module.exports={
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteABook
}