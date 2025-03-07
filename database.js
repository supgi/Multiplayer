const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

function createUser(name, password, callback) {

    db.serialize(async function() {

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                password TEXT UNIQUE NOT NULL
            )
        `);

        db.all('SELECT * FROM users WHERE name = ?', [name], (err, rows) => {

            if (err) throw err
            if (rows.length > 0) {
                
                callback("User ja cadastrado");

            } else {

                const stmt = db.prepare('INSERT INTO users (name, password) VALUES (?, ?)');
    
                stmt.run([name, password])
            
                stmt.finalize();

                callback("Created");
            }

        })
    
    })

}

function validateUser(name, password, callback) {

    db.serialize(async function() {

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                password TEXT UNIQUE NOT NULL
            )
        `);

        db.all('SELECT * FROM users WHERE name = ? and password = ?', [name, password], (err, rows) => {

            if (err) throw err
            if (rows.length > 0) {
                
                callback(rows[0]);
                
            } else {
                
                callback("User or password incorrect")

            }

        })
    
    })

}

module.exports = {
    createUser,
    validateUser
}