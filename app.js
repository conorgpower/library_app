var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');

const books = require("./routes/books");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//Custom Library Web App Routes
app.get('/books', books.findAll);
app.get('/books/totalBooks', books.findTotalBooks);
app.get('/books/:id', books.findOne);
app.get('/books/:id/findName', books.findName);
app.get('/books/:id/findAuthor', books.findAuthor);
app.get('/books/:id/findStock', books.findStock);

app.post('/books', books.addBook);

app.put('/books/:id/returnExistingBook', books.returnExistingBook);
app.put('/books/:id/updateBookName', books.updateBookName);
app.put('/books/:id/updateBookAuthor', books.updateBookAuthor);

app.delete('/books/:id', books.deleteBook);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
