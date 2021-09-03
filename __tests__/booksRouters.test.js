const request = require("supertest");
const jsonschema = require("jsonschema");
const bookSchema = require("../schemas/bookSchema.json");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");


describe("Auth Routes Test", () => {
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

    describe("GET /", () => {
        test("get all books", async () => {

            let response = await request(app).get("/books/");

            expect(response.statusCode).toEqual(200);
            expect(response.body.books[0]).toEqual(BOOK);
            
        });
  
    });

    describe("GET /:id", () => {
        test("get book using isbn", async () => {

            let response = await request(app).get(`/books/${BOOK.isbn}`);

            expect(response.statusCode).toEqual(200);
            expect(response.body.book).toEqual(BOOK);
            
        });
  
    });

    describe("POST /", () => {
        test("apply book into database", async () => {

            let NEW_BOOK = {
                "isbn": "0691161519",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "New Author",
                "language": "english",
                "pages": 255,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year":2019
            };

            let response = await request(app).post("/books/").send(NEW_BOOK);

            expect(response.statusCode).toEqual(201);
            expect(response.body.book).toEqual(NEW_BOOK);
        });
    });

    describe("POST /", () => {
        test("apply book into database using wrond data", async () => {

            let NEW_BOOK = {
                "isbn": "0691161519",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "New Author",
                "language": "english",
                "pages": 255,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": "two thousand twenty"
            };

            let response = await request(app).post("/books/").send(NEW_BOOK);

            expect(response.statusCode).toEqual(400);
            expect(response.body.message[0]).toEqual("instance.year is not of a type(s) integer");

        });
    });

    describe("PUT /isbn", () => {
        test("update existing book", async () => {
            BOOK.title = "Updated title";
            BOOK.year = 2018;
            let response = await request(app).put(`/books/${BOOK.isbn}`).send(BOOK);

            expect(response.statusCode).toEqual(200);
            expect(response.body.book).toEqual(BOOK);
            
        });
    });

    describe("DELETE /isbn", () => {
        test("delete existing book", async () => {

            let response = await request(app).delete(`/books/${BOOK.isbn}`);

            expect(response.statusCode).toEqual(200);
            expect(response.body.message).toEqual("Book deleted");
            
        });
    });
});
  
  afterEach(async () => {
    await db.query("DELETE FROM books");
  });
  
  afterAll(async () => {
    await db.end();
  });