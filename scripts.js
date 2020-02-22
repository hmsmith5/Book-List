const NUM_PROPERTIES = 4; //Number of book properties i.e. title,author,...

let myLibrary = [];
let libraryIndex = 0;

//Book object
function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = true;
    this.bookIndex = libraryIndex;
    libraryIndex++;
    this.info = function(){
        return title + " by " + author; 
    }
}

//Sample books
const book1 = new Book("Harry Potter", "J.K. Rowling", 400);
console.log(book1.info());
addBooktoLibrary(book1);

const book2 = new Book("Outliers", "Malcolm Gladwell", 300);
console.log(book2.info());
addBooktoLibrary(book2);

//Function to add new book to list
function addBooktoLibrary(book){
    myLibrary.push(book);
}

//Table showing books
let table = document.createElement("table");
let header = document.createElement("thead");
let tbody = document.createElement("tbody"); 
let headRow = document.createElement("tr");

["Title","Author","Pages", "Read", "Delete"].forEach(function(el) {
    var th=document.createElement("th");
    th.appendChild(document.createTextNode(el));
    headRow.appendChild(th);
  });

  header.appendChild(headRow);
  table.appendChild(header); 

//Generate table with list of books
function render() {

    myLibrary.forEach(function(el){
        let tr = document.createElement("tr");
        let counter = 0;
        for (let i in el) {
            if (counter >=  3){
                continue;
            }
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(el[i]));
            tr.appendChild(td);
            counter++;
        }
        //Read status
        let td = document.createElement("td");
        readOption = document.createElement("select");
        let op = document.createElement("option");
        op.value = 1;
        op.text = "Read";
        readOption.options.add(op); 
        
        let op2 = document.createElement("option");
        op2.value = 0;
        op2.text = "Not Read";
        readOption.options.add(op2);
        td.appendChild(readOption);
        tr.appendChild(td);

        readOption.addEventListener("change", function(){
            let row = readOption.parentElement.parentElement;
            changeStatus(this.value, row);
        });

        //Delete button
        let td2 = document.createElement("td");
        let deletebut = document.createElement("button");
        deletebut.innerHTML = "delete";

        td2.appendChild(deletebut);
        tr.appendChild(td2);
        deletebut.addEventListener("click", function(){
            deleteBook(deletebut.parentElement.parentElement);
        })
        tbody.appendChild(tr);
    
    })

    table.appendChild(tbody);
    

   document.getElementById("content").appendChild(table);
    
}

//Initial table
render();


//form to add new book
document.getElementById("addbook").addEventListener("submit", addNewBook);

function addNewBook() {
    let titleEntered = document.getElementById("title").value;
    let authorEntered = document.getElementById("author").value;
    let pagesEntered = document.getElementById("pages").value;
    let newBook = new Book(titleEntered, authorEntered, pagesEntered, false);
    addBooktoLibrary(newBook);
    render();
}

//Function to delete book with given index
function deleteBook(Rownum){
    const bookTitle = Rownum.children[0].innerHTML; 
    table.deleteRow(Rownum.rowIndex);               
    for (i = 0; i < myLibrary.length; i++) {             
        if (myLibrary[i].title == bookTitle) {           
            myLibrary.splice(i, 1); 
        }
    }
}

/*
Function to change read status
params: select option and row
*/
function changeStatus(option, row){
    const bookTitle = row.children[0].innerHTML; 
    for (i = 0; i < myLibrary.length; i++) {             
        if (myLibrary[i].title == bookTitle) {           
             bookToChange = myLibrary[i];
        }
    }
    bookToChange.read = (option == true) ? true : false;
    console.log(bookToChange.read);
}


/*
TODO:
-Add local storage/Firebase storage
-Add delete button
-Optimize layout/look
*/