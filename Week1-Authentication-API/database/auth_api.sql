-- =============================================
-- Authentication API Database
-- InternGrow Backend Internship - Week 01
-- Database: PostgreSQL
-- =============================================

-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role VARCHAR(20) DEFAULT 'user',

    is_verified BOOLEAN DEFAULT FALSE,

    verification_token TEXT,

    reset_token TEXT,

    reset_token_expiry TIMESTAMP,

    profile_image TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Constraints
-- =============================================

ALTER TABLE users
ADD CONSTRAINT users_email_key UNIQUE (email);

-- =============================================
-- Useful SQL Queries
-- =============================================

-- View all users
-- SELECT * FROM users;

-- Delete all users
-- DELETE FROM users;

-- Reset auto increment
-- ALTER SEQUENCE users_id_seq RESTART WITH 1;

-- =============================================
-- Sample Admin User (Optional)
-- Uncomment and replace the password hash if needed.
-- =============================================

/*

INSERT INTO users
(
    name,
    email,
    password,
    role,
    is_verified
)
VALUES
(
    'Admin',
    'admin@example.com',
    '$2b$10$YOUR_BCRYPT_HASH',
    'admin',
    TRUE
);

*/

-- =============================================
-- End of File
-- =============================================