/** Common config for bookstore. */


let DB_URI = {
  host: "localhost",
  user: "books_user_test",
  password: "password",
  database: ""
}

DB_URI.database = (process.env.NODE_ENV === "test")? "books_test": "books";


module.exports = { DB_URI };