"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const books_1 = __importDefault(require("../Models/books"));
router.get('/', (req, res, next) => {
    books_1.default.find((err, books) => {
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
router.get("/add", (req, res, next) => {
    res.render("books/add.ejs", {
        title: "Add a book",
    });
});
router.post("/add", (req, res, next) => {
    let newBook = new books_1.default({
        Title: req.body.title,
        Price: req.body.price,
        Description: req.body.description,
        Author: req.body.author,
        Genre: req.body.genre,
    });
    books_1.default.create(newBook, (err, books) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect("/books229");
        }
    });
});
router.get("/edit/:id", (req, res, next) => {
    let id = req.params.id;
    books_1.default.findById(id, (err, BookToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render("books/edit", {
                title: "Edit Book",
                books: BookToEdit,
            });
        }
    });
});
router.post("/edit/:id", (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    let editBook = new books_1.default({
        _id: req.params.id,
        Title: req.body.title,
        Author: req.body.author,
        Description: req.body.description,
        Price: req.body.price,
        Genre: req.body.genre,
    });
    books_1.default.updateOne({ _id: id }, editBook, {}, (err) => {
        console.log(id);
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            console.log("success");
            res.redirect("/books229");
        }
    });
});
router.get("/delete/:id", (req, res, next) => {
    let id = req.params.id;
    books_1.default.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect("/books229");
        }
    });
});
//# sourceMappingURL=books.js.map