const express = require("express");
const Library = require("./library.js");
const router = express.Router();

let lib = new Library();
let books = lib.books.books;


router.get("/", (req, res) => {
    res.render("index", {
        page_title : "Home Library",
        books : lib.books.books
    });
});

router.get("/add-book", (req, res) => {
    res.render("add-book", {
            page_title : "Home Library: Add book",
    });
});

router.get("/book/:id", (req, res) => {
    const book_id = parseInt(req.params.id, 10);
    let id = -1;
    for (let i=0; i<lib.books.books.length; ++i){
        if (lib.books.books[i].id !== undefined && lib.books.books[i].id == book_id){
            id = i;
            break;
        }
    }
    if (id !== -1){
        res.render("book", {
            page_title : "Home Library: Book page",
            book : books[id]
        });
    } else {
        res.sendStatus(404);
    }
});

router.post("/book/:id/update", (req, res) => {
    const book_id = parseInt(req.body.id, 10);
    let id = -1;
    for (let i = 0; i <= lib.books.books.length; ++i){
        if (lib.books.books[i].id !== undefined && lib.books.books[i].id == book_id){
            id = i;
            break;
        }
    }
    if (id !== -1){
        lib.updateBook(req.body, id);
    } else {
        res.sendStatus(404);
    }
});

router.post("/create-book", (req, res) => {
    lib.createBook(req.body);
    res.redirect("/");
});

router.post("/book/:id/delete", (req, res) => {
    const book_id = parseInt(req.body.id, 10);
    let id = -1;
    for (let i = 0; i <= lib.books.books.length; ++i){
        if (lib.books.books[i].id !== undefined && lib.books.books[i].id == book_id){
            id = i;
            break;
        }
    }
    if (id !== -1){
        lib.deleteBook(id);
    } else {
        res.sendStatus(404);
    }
});

router.post("/filter", (req, res) => {
    const filter = req.body.filter_option;
    let filtered = [];
    if (filter === "all") {
        filtered = lib.books.books;
    } else if (filter === "in_library") {
        for (let book of lib.books.books) {
            if (book.current_owner === "") {
                filtered.push(book);
            }
        }
    } else if (filter === "return_till") {
        for (let book of lib.books.books) {
            if (book.return_till !== "") {
                filtered.push(book);
            }
        }
        filtered.sort((a, b) => {
            return a.return_till.localeCompare(b.return_till);
        });
    }
    res.json(filtered);
});


module.exports = router;
