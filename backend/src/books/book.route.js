const express=require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middlewear/verifyAdminToken');
const router = express.Router();
 
//post a book
router.post("/create-book",verifyAdminToken ,postABook)
//getting All books
router.get("/", getAllBooks);
//get single book
router.get("/:id",getSingleBook);
//update abook
router.put("/edit/:id",verifyAdminToken ,updateBook);
//delete
router.delete("/:id",verifyAdminToken , deleteABook);


module.exports = router;