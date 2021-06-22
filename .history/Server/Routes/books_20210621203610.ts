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
  res.render("books/add", {
    title: "Add a book",
  });
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
  let BookToEdit = new book()

  book.findById(id, (err, BookToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("books/edit", {
        title: "Edit Book",
        books: BookToEdit,
      });
    }
  });
});
// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


//module.exports = router;
