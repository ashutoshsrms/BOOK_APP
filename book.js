class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    static addBook(book) {
        const list = document.querySelector("#book-list")
        const row = document.createElement("tr")
        //console.log(row)
        row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>  `;
        //console.log(row)
        list.appendChild(row);
    }
    static clear()
    {
        document.querySelector("#title").value = " ";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
   static show_alert(msg,className)
    {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(msg))
        const container = document.querySelector(".test")
        const form = document.querySelector("#book-form")
//console.log(container,form)
        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector(".alert").remove();
        },5000);
    }

    static default_books(){  //arry of objects
    //     const b=[{
    //         title:"Book-1",
    //         author:"XYZ",
    //         isbn:1234

    //     },{
    //         title:"Book-2",
    //         author:"ABC",
    //         isbn:5678
    //     }]
         const books=store.get_book()
        books.forEach(adding => UI.addBook(adding))
    }

    static delete_book(a){

        if (a.target.classList.contains("delete")) {
            if (confirm("Are You Sure To Delete It")) {
                a.target.parentElement.parentElement.remove()
            }
         }
    }
}

// local storage

class store{
    // add book to local storage
    static add_book(book)
    {
       const book_arr=store.get_book()
       book_arr.push(book);  //object of Book -> book
       localStorage.setItem("key",JSON.stringify(book_arr)) // key -> book key value pair
    }

    // get_book from local storage

    static get_book(){
        let books
        if(localStorage.getItem("key")===null)
        {
             books=[]
        }
        else
        {
            books=JSON.parse(localStorage.getItem("key"))
        }
        return books
    }

    //delete book from local storage
    static delete_book(isbn)
    {
        //console.log(isbn)
        const delete_book=store.get_book();
        console.log("before",delete_book);
        delete_book.forEach((book,index) => {
            if(book.isbn===isbn){
               // console.log(Book.isbn)
                delete_book.splice(index,1)
            }
            console.log("after",delete_book);
            localStorage.setItem("key",JSON.stringify(delete_book))
        })
    }

}

function search(e){
    let text=e.target.value.toLowerCase();
    console.log(text);
    row=document.getElementsByTagName("tr")
    //console.log(row);
    Array.from(row).forEach(function(x)
    {
        let data=x.textContent;
        //console.log(data)
        if(x.toLowerCase().indexOf(text)!= -1)
            x.style.display='block';
        else
            x.style.display='none'
    })
 
}

//events
document.querySelector("#book-form").addEventListener('submit', (e) => {
    e.preventDefault()
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value
    if (title == '' || author == '' || isbn == ''){
        UI.show_alert("Please Fill all the Fields","danger","danger");
        // console.log("hello")
        return;

    }
    else{
    const book = new Book(title, author, isbn)
    UI.addBook(book)
    store.add_book(book)
    UI.clear();
    UI.show_alert("Book added Succesfully","success");
    }
})

document.querySelector("#book-list").addEventListener("click", (a)=>{
   // console.log("test");
    UI.delete_book(a)
    store.delete_book(a.target.parentElement.previousElementSibling.textContent)
    UI.show_alert('Book Deleted successfully','danger')

});


// Slider js
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}
