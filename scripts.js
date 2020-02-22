const NUM_PROPERTIES = 4; //Number of book properties i.e. title,author,...

//Array of Books
let myLibrary = [];

//Book object
function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = true;
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

    let index = 0;
    myLibrary.forEach(function(el){
        let tr = document.createElement("tr");
        let counter = 0;
        for (let i in el) {
            if (counter >=  4){
                continue;
            }
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(el[i]));
            tr.appendChild(td);
            counter++;
        }
        let td = document.createElement("td");
        let deletebut = document.createElement("button");
        deletebut.innerHTML = "delete";
        deletebut.addEventListener("click", function(){
            deleteBook(index);
        })
        td.appendChild(deletebut);
        tr.appendChild(td);
        tbody.appendChild(tr);
        index++;
    })

    table.appendChild(tbody);
    

   document.getElementById("content").appendChild(table);
    
}
render();



document.getElementById("addbook").addEventListener("submit", addNewBook);

function addNewBook() {
    let titleEntered = document.getElementById("title").value;
    let authorEntered = document.getElementById("author").value;
    let pagesEntered = document.getElementById("pages").value;
    let newBook = new Book(titleEntered, authorEntered, pagesEntered, false);
    addBooktoLibrary(newBook);
    render();
}

function deleteBook(booknum){
   table.deleteRow(booknum);
}


/*
TODO:
-Add local storage/Firebase storage
-Add delete button
-Optimize layout/look
*/