const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize database
const dbPath = path.resolve(__dirname, 'biteburn.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initTables();
    }
});

function initTables() {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // User Data table (key-value store for flexibility)
        db.run(`CREATE TABLE IF NOT EXISTS user_data (
            user_id INTEGER NOT NULL,
            key TEXT NOT NULL,
            value TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, key),
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`);
    });
}

// Promisify db.get
function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

// Promisify db.run
function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

// Promisify db.all
function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = {
    async createUser(email, password, name, profileData = {}) {
        try {
            // 1. Create user record
            const result = await dbRun(
                'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
                [email, password, name]
            );
            const userId = result.lastID;

            // 2. Save profile data to user_data table
            // We save the rest of the profile as a single JSON object under 'profile' key
            // This makes it easy to restore the full object on frontend
            if (Object.keys(profileData).length > 0) {
                const jsonValue = JSON.stringify(profileData);
                await dbRun(
                    `INSERT INTO user_data (user_id, key, value) VALUES (?, 'profile', ?)`,
                    [userId, jsonValue]
                );
            }

            return { id: result.lastID, email, name };
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                throw new Error('Email already exists');
            }
            throw error;
        }
    },

    async getUserByEmail(email) {
        return await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    },

    async getUserData(userId) {
        const rows = await dbAll('SELECT key, value FROM user_data WHERE user_id = ?', [userId]);
        const data = {};
        rows.forEach(row => {
            try {
                data[row.key] = JSON.parse(row.value);
            } catch (e) {
                data[row.key] = row.value;
            }
        });
        return data;
    },

    async saveUserData(userId, key, value) {
        const jsonValue = JSON.stringify(value);
        return await dbRun(
            `INSERT INTO user_data (user_id, key, value) 
             VALUES (?, ?, ?) 
             ON CONFLICT(user_id, key) DO UPDATE SET 
             value = excluded.value, 
             updated_at = CURRENT_TIMESTAMP`,
            [userId, key, jsonValue]
        );
    },

    async deleteUser(userId) {
        try {
            // 1. Delete user data
            await dbRun('DELETE FROM user_data WHERE user_id = ?', [userId]);

            // 2. Delete user record
            await dbRun('DELETE FROM users WHERE id = ?', [userId]);

            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
};
