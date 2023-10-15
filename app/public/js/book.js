window.onload = function () {
    let current_owner = document.getElementById("current_owner");
    let return_till = document.getElementById("return_till");
    let return_till_paragraph = document.getElementById("return_till_paragraph");

    let issue_button = document.getElementById("issue");
    let return_button = document.getElementById("return");
    if (current_owner && current_owner.textContent === ""){
        current_owner.textContent = " In library";
        return_till.style.display = "none";
        return_button.style.display = "none";
        return_till_paragraph.style.display = "none";
        issue_button.style.display = "block";
    } else {
        return_button.style.display = "block";
        issue_button.style.display = "none";
    }
}

function updateParams(params){
    fetch('/book/' + params.id + '/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Bad resposnse');
            }
            return response.json();
        })
        .catch(error => console.error('Fetch error'));
}

function parseId(){
    const regex = /book\/\d*/;
    const id_regex = /\d*$/;
    const found = window.location.href.match(regex);
    if (found){
        return parseInt(found[0].match(id_regex)[0], 10);
    }
    return -1;
}

function submitButtonClick(){
    const params = {
        id: parseId(),
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        publish_year: document.getElementById("publish_year").value,
        current_owner: "",
        return_till: ""
    };
    let current_owner = document.getElementById("current_owner");
    let return_till = document.getElementById("return_till");

    if (current_owner && current_owner.textContent !== ""){
        params.current_owner = current_owner.textContent;
        params.return_till = return_till.textContent;
    } 

    updateParams(params);
    window.location.href = location.href;
}

function openIssueDialog(){
    const modal = document.getElementById("issue_book");
    modal.style.display = "block";
}

function returnBookButtonClick(){
    const params = {
        id: parseId(),
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        publish_year: document.getElementById("publish_year").value,
        current_owner: "",
        return_till: ""
    };
    updateParams(params);
    window.location.href = location.href;
}

function closeIssueDialog(){
    const modal = document.getElementById("issue_book");
    modal.style.display = "none";
}

function submitIssueButtonClick(){
    const params = {
        id: parseId(),
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        publish_year: document.getElementById("publish_year").value,
        current_owner: document.getElementById("issue_name").value,
        return_till: document.getElementById("issue_return_till").value
    };
    updateParams(params);
    closeIssueDialog();
}


