-- Add document name columns for UI display
ALTER TABLE projects ADD COLUMN pitch_deck_name VARCHAR(255) NULL;
ALTER TABLE projects ADD COLUMN business_plan_name VARCHAR(255) NULL;
