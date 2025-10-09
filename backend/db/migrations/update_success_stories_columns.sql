-- Update success_stories table to support larger base64 data
USE merit_capital;

-- Update image_url column to LONGTEXT to handle base64 image data
ALTER TABLE success_stories MODIFY COLUMN image_url LONGTEXT NULL;

-- Add video_url column as LONGTEXT to handle base64 video data  
ALTER TABLE success_stories MODIFY COLUMN video_url LONGTEXT NULL;

-- Add other missing columns that the frontend expects
ALTER TABLE success_stories ADD COLUMN full_story TEXT NULL;
ALTER TABLE success_stories ADD COLUMN industry VARCHAR(128) NULL;
ALTER TABLE success_stories ADD COLUMN date DATETIME NULL;
ALTER TABLE success_stories ADD COLUMN published_date DATETIME NULL;
