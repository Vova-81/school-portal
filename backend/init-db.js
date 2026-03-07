const db = require('./database');

async function initializeDatabase() {
    try {
        console.log('🔄 Инициализация базы данных...');
        
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                full_name VARCHAR(100) NOT NULL,
                role VARCHAR(20) DEFAULT 'director',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP
            )
        `);
        
        await db.query(`
            CREATE TABLE IF NOT EXISTS announcements (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                content TEXT NOT NULL,
                category VARCHAR(50) DEFAULT 'all',
                type VARCHAR(50) DEFAULT 'announcement',
                author VARCHAR(100) NOT NULL,
                pinned BOOLEAN DEFAULT FALSE,
                urgent BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await db.query(`
            CREATE TABLE IF NOT EXISTS schedules (
                id SERIAL PRIMARY KEY,
                class_number INTEGER NOT NULL,
                class_letter VARCHAR(5) NOT NULL,
                day_of_week VARCHAR(20) NOT NULL,
                start_time TIME NOT NULL,
                end_time TIME NOT NULL,
                subject VARCHAR(100) NOT NULL,
                teacher VARCHAR(100) NOT NULL,
                room VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('✅ База данных успешно инициализирована');
        
        const result = await db.query('SELECT COUNT(*) FROM users');
        console.log(`👥 Пользователей в БД: ${result.rows[0].count}`);
        
    } catch (error) {
        console.error('❌ Ошибка инициализации БД:', error);
    } finally {
        process.exit();
    }
}

initializeDatabase();