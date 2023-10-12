const express = require("express");
const Library = require("../public/js/library.js");


const router = express.Router();


router.get("/", (req, res) => {
    let lib = new Library().books;
    res.render("index", 
        {
            page_title : "Home Library",
            books : lib.books
        }
    );
   
});

module.exports = router;
