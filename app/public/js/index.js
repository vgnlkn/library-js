function addBookRedirect(){
    window.location.href = "/add-book";
}

function deleteBookOpenDialog(id){
    const modal = document.getElementById("delete-book");
    modal.style.display = "block";
    let id_span = document.getElementById("id");
    id_span.textContent = id;
}

function deleteBookCloseDialog(){
    const modal = document.getElementById("delete-book");
    modal.style.display = "none";
}

function deleteBookConfirmed(){
    let id_span = document.getElementById("id");
    let id = parseInt(id_span.textContent, 10);
    fetch('/book/' + id + '/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    })
        .then(response => {            
            if (!response.ok) {
                throw new Error('Bad resposnse');
            }
            return response.json();
        })
        .catch(error => console.error('Fetch error'));

   deleteBookCloseDialog();
   window.location.href = location.href;
}

function displayFiltered(books){
    let books_html = document.getElementById("books");
    books_html.innerHTML = "";
    for (let book of books){
        let div_book = document.createElement("div");
        div_book.innerHTML = ' \
        <div class=\"card\">    \
            <div>               \
                <h2>            \
                    <a class="book-page-link" href="/book/'+ book.id +'">   \
                    ' + book.title +'  \
                    </a>    \
                </h2>   \
            </div>\
            <div>\
                <p class="info">Author: <i> ' + book.author +'</i></p>\
            </div>\
            <div><p class="info">Published in '+ book.publish_year + '</p>\
            </div>\
            <div>\
                <img class="delete-icon" src="/public/img/delete-icon.svg" onclick="deleteBookOpenDialog('+ book.id +');">\
            </div>\
            </div> \
        ';
        books_html.appendChild(div_book);
    }
}

function filter(){
    const filter_option = document.getElementById("filter-option");
    const option = filter_option.value;
    fetch('/filter/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filter_option: option }),
    })
        .then(response => {            
            if (!response.ok) {
                throw new Error('Bad resposnse');
            }
            return response.json();
        })
        .then((data) => {
            displayFiltered(data);
        })
        .catch(error => console.error('Fetch error'));
    
    
}