const fs = require('fs');

const lib_file_path = "../library.json"

class Library{
    constructor(){
        const file_content = fs.readFileSync(lib_file_path, 'utf8');
        try {
            this.books = JSON.parse(file_content);
        } catch (parseError) {
            console.error(parseError);
        }       
    }

    createBook(params){
        if (!this.validateParams(params)){
            return;
        }
        const size = this.books.books.length;
        const book = {
            id: this.books.books[size-1].id + 1,
            title: params.title,
            author: params.author,
            publish_year: parseInt(params.publish_year, 10),
            current_owner: "",
            return_till: ""
        };
        this.books.books.push(book);
    }

    updateBook(params, index){
        if (!this.validateParams(params)){
            return;
        }
        const book = {
            id: params.id,
            title: params.title,
            author: params.author,
            publish_year: parseInt(params.publish_year, 10),
            current_owner: "",
            return_till: ""
        };
        if (params.current_owner && params.return_till){
            book.current_owner = params.current_owner;
            book.return_till = params.return_till;
        }
        this.books.books.splice(index, 1, book);
    }

    validateParams(params, validate_owner=false){
        if (params.title === undefined || params.title === ""){
            return false;
        }
        if (params.author === undefined || params.author === ""){
            return false;
        }
        if (params.publish_year === undefined || params.publish_year === ""){
            return false;
        }
        if (validate_owner){
            if (params.current_owner === undefined || params.current_owner === ""){
                return false;
            }
            if (params.return_till === undefined || params.return_till === ""){
                return false;
            }
        }
        return true;
    }

    deleteBook(id){
        this.books.books.splice(id, 1);
    }
}

module.exports = Library;