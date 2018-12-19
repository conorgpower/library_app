let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Book = require('../models/books');

var mongodbUri ='mongodb://conorgpower:WebAppDev2018@ds225703.mlab.com:25703/booksdb';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});


//List all books
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Book.find(function(err, books) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(books,null,5));
    });
};

//Find and list one book
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.find({ "_id" : req.params.id },function(err, book) {
        if (err)
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(book,null,5));
    });
};

//Find book name by id
router.findName = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.findById(req.params.id ,function(err, book) {
        if (err)
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(book.bookName,null,5));
    });
};

//Find books author by id
router.findAuthor = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.findById(req.params.id ,function(err, book) {
        if (err)
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(book.author,null,5));
    });
};

//Find books stock by id
router.findStock = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.findById(req.params.id ,function(err, book) {
        if (err)
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(book.stock,null,5));
    });
};

router.addBook = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var book = new Book();

    book.bookName = req.body.bookName;
    book.author = req.body.author;

    book.save(function(err) {
        if (err)
            res.json({ message: 'Book NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Book Successfully Added!', data: book });
    });
};

//Edit book name
router.updateBookName = (req, res) => {

    Book.findById(req.params.id, function(err,book) {
        if (err)
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else {
            book.bookName = req.body.bookName;
            book.author = book.author;

            book.save(function (err) {
                if (err)
                    res.json({ message: 'Book Name Update NOT Successful!', errmsg : err } );
                else
                    res.json({ message: 'Book Name Successfully Updated!', data: book });
            });
        }
    });
};

//Edit book author
router.updateBookAuthor = (req, res) => {

    Book.findById(req.params.id, function(err,book) {
        if (err)
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else {
            book.bookName = bookName;
            book.author = req.body.author;

            book.save(function (err) {
                if (err)
                    res.json({ message: 'Book Author Update NOT Successful!', errmsg : err } );
                else
                    res.json({ message: 'Book Author Successfully Updated!', data: book });
            });
        }
    });
};

//Increase stock i.e. users returns an existing book
router.returnExistingBook = (req, res) => {

    Book.findById(req.params.id, function(err,book) {
        if (err)
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else {
            book.stock += 1;
            book.save(function (err) {
                if (err)
                    res.json({ message: 'Book Return NOT Successful!', errmsg : err } );
                else
                    res.json({ message: 'Existing Book Successfully Returned!', data: book });
            });
        }
    });
};

//Increase stock i.e. users returns an existing book
router.returnExistingBook = (req, res) => {

    Book.findById(req.params.id, function(err,book) {
        if (err)
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else {
            book.stock += 1;
            book.save(function (err) {
                if (err)
                    res.json({ message: 'Book Return NOT Successful!', errmsg : err } );
                else
                    res.json({ message: 'Existing Book Successfully Returned!', data: book });
            });
        }
    });
};

router.deleteBook = (req, res) => {

    Book.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Book NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Book Successfully Deleted!'});
    });
};


router.findTotalBooks = (req, res) => {

    Book.find(function(err, books) {
        if (err)
            res.send(err);
        else
            res.json({ totalBooks : getTotalStock(books) });
    });
};

// function getByValue(array, id) {
//     var result  = array.filter(function(obj){return obj.id == id;} );
//     return result ? result[0] : null; // or undefined
// }

function getTotalStock(array) {
    let totalStock = 0;
    array.forEach(function(obj) { totalStock += obj.stock; });
    return totalStock;
}

module.exports = router;
