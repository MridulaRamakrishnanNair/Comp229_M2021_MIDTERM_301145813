// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  //show the add view
  res.render("books/details", {
    title: "Add a book", page: "details",books: "",});
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  let newBook = new book({
    Title: req.body.title,
    Price: req.body.price,
    Description: req.body.description,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  book.create(newBook, (err, books) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the Books List

      res.redirect("/books");
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  book.findById(id, {}, {}, (err, bookToEdit)  => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("books/edit", {
        title: "Edit Book",
        books: bookToEdit,
      });
    }
  });
});
// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  let editBook = new book({
    _id: req.params.id,
    Title: req.body.title,
    Author: req.body.author,
    Price: req.body.price,
    Genre: req.body.genre,
  });

  book.updateOne({ _id: id }, editBook, {}, (err) => {
    console.log(id);
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      
      res.redirect("/books229");
    }
  });
});


// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {

   
    let id = req.params.id;
    book.deleteOne({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the Book List
        res.redirect("/books229");
      }
    });
});


//module.exports = router;
