-- Fix image_url column to handle longer data URLs
ALTER TABLE projects MODIFY COLUMN image_url TEXT;
