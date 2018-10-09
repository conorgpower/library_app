let books = require('../models/books');
let express = require('express');
let router = express.Router();

//List all books
router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(books,null,5));
    // Return a JSON representation of our list
    if (books != null) {
        res.json(books);
    } else {
        res.send('Books NOT Found!');
    }
}

//Find and list one book
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var book = getByValue(books,req.params.id);

    if (book != null)
        res.send(JSON.stringify(book,null,5));
    else
        res.send('Donation NOT Found!!');

}

router.addBook = (req, res) => {
    //Add a new book to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id

    var currentSize = books.length;

    books.push({"id" : id, "author" : req.body.author, "stock" : req.body.stock});

    if((currentSize + 1) == books.length)
        res.json({ message: 'Book Added!'});
    else
        res.json({ message: 'Book NOT Added!'});
}

//Increase stock i.e. users returns an existing book
router.incrementStock = (req, res) => {

    var book = getByValue(books,req.params.id);
    var stock = book.stock.length;
    book.stock += 1;

    if ((stock + 1) == book.stock.length) {
        res.json({ message: book.id + book.bookName + book.author + stock })
    } else {
        res.json({message: "Book NOT found!"})
    }
}

router.deleteBook = (req, res) => {
    //Delete the selected book based on its id
    var book = getByValue(books,req.params.id);
    var index = books.indexOf(book);

    var currentSize = books.length;
    books.splice(index, 1);

    if((currentSize - 1) == books.length)
        res.json({ message: 'Book Deleted!'});
    else
        res.json({ message: 'Book NOT Deleted!'});
}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}


module.exports = router;