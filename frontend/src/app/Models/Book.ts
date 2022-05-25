export class Book {
    __id!: String;
    title: String;
    author: String;
    isbn: Number;
    editor: String;
    language: String;
    quantity: Number;
    condition: String;
    pages: Number;
    price: String;
    
    constructor(title: String, author: String, isbn: Number, editor: String, language: String, quantity: Number, condition: String, pages: Number, price: String) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.editor = editor;
        this.language = language;
        this.quantity = quantity;
        this.condition = condition;
        this.pages = pages;
        this.price = price;
    }
  }
  