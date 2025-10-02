-- Add profile fields to users table
ALTER TABLE users 
ADD COLUMN phone VARCHAR(32) NULL AFTER full_name,
ADD COLUMN location VARCHAR(191) NULL AFTER phone,
ADD COLUMN bio TEXT NULL AFTER location,
ADD COLUMN company VARCHAR(191) NULL AFTER bio,
ADD COLUMN position VARCHAR(191) NULL AFTER company,
ADD COLUMN website VARCHAR(512) NULL AFTER position,
ADD COLUMN linkedin VARCHAR(512) NULL AFTER website,
ADD COLUMN twitter VARCHAR(512) NULL AFTER linkedin;

-- Update avatar_url column name to match frontend
ALTER TABLE users CHANGE COLUMN avatar_url avatar VARCHAR(512) NULL;

