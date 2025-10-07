-- Add team information columns
ALTER TABLE projects ADD COLUMN co_founders TEXT NULL;
ALTER TABLE projects ADD COLUMN team_members TEXT NULL;
