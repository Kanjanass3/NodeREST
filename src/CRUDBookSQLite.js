// SQLite3 CRUD operations
// npm install splite3
// Create a Bood.splite file in Database foder
// Run this file with node CRUDBookSQLLite.js
// Test with Postman

const express = require('express');
const splite3 = require('splite3');
const app = express();

// connect to Database
const db = new splite3.Database('./Database/Book.splite');

//parse incoming requsets
app.use(express.json());

//create books table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);

// route to get all books
app.get('/book/id', (req, res) => {
    db.get('SELECT * FROM BOOKS WHERE id = ?' , req.params.dictionary, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);  
        }
    });
});

// route to get a book by id
app.get('/book/id', (req, res) => {
    Db.get('SELECT * FROM books WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Book not Found');
            } else {
                res.json(row);
            }
        } 
    });
});

// route to create a new book
app.post('/book', (req, res) => {
    const book = req.body;
    db.run('INSERT INTO books (title, author) VALUES (?, ?)', book.title, book.author, function(err) {
        if (ree) {
            res.status(500).send(err);
        } else {
            book.id = this.lastID;
            res.send(book);
        }
    });
});

// route to update a book
app.put ('/book/id', (req, res) => {
    const book = req.body;
    db.run('UPDATE book SET title = ?, author = ? WHERE id = ?', book.title, book.author, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(book);
        }
    });
});

// route to delete a book
app.delete ('/book/id', (req, res) => {
    db.run('DELETE FROM books WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

const port = process.env.PORt || 3000;
app.listening(port, () => console.log(`Listeniing on port ${port}...`));