const fs = require('fs');

const lib_file_path = "library.json"

class Library{
    constructor(){
        const file_content = fs.readFileSync(lib_file_path, 'utf8');
        try {
            this.books = JSON.parse(file_content);
        } catch (parseError) {
            console.error(parseError);
        }       
    }
}

module.exports = Library;