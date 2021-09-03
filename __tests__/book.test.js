const db = require("../db");
const Book = require("../models/book");


describe("Test Book class", () => {

  let BOOK;

  beforeEach(async () => {
    BOOK = await Book.create({
      "isbn": "0691161518",
      "amazon_url": "http://a.co/eobPtX2",
      "author": "Matthew Lane",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      "year":2019
    });
  });

  test("check if book exists", async () => {
    expect(BOOK).toEqual({
      "isbn": "0691161518",
      "amazon_url": "http://a.co/eobPtX2",
      "author": "Matthew Lane",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      "year":2019
      });
  });

  test("get all books from books table", async () => {
    const books = await Book.findAll();
    expect(books.length).toEqual(1);
    expect(books[0].isbn).toEqual(BOOK.isbn)
  });

  test("find book using isbn number", async () => {
    const book = await Book.findOne(BOOK.isbn);
    expect(book).toEqual(BOOK);
  });

  test("update existing book", async () =>{
    BOOK.title = "New updated title";
    const result = await Book.update(BOOK.isbn, BOOK);
    expect(result.title).toBe("New updated title");
  });

});

afterEach(async () => {
  await db.query("DELETE FROM books");
});

afterAll(async () => {
  await db.end();
});