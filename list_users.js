const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'biteburn.db');
const db = new sqlite3.Database(dbPath);

console.log('Listing all users:');
db.each("SELECT id, email, name FROM users", (err, row) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`${row.id}: ${row.email} (${row.name})`);
    }
}, (err, count) => {
    console.log(`Total users: ${count}`);
    db.close();
});
