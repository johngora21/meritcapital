-- Expand projects table to include all fields used by Add Project form
ALTER TABLE projects
  MODIFY COLUMN status ENUM('Pending','Approved','Rejected','Active','Paused','Archived') NOT NULL DEFAULT 'Pending',
  ADD COLUMN tagline VARCHAR(255) NULL,
  ADD COLUMN website VARCHAR(512) NULL,
  ADD COLUMN linkedin VARCHAR(512) NULL,
  ADD COLUMN founded DATE NULL,
  ADD COLUMN employees VARCHAR(64) NULL,
  ADD COLUMN seeking TEXT NULL,

  ADD COLUMN founder_name VARCHAR(191) NULL,
  ADD COLUMN founder_role VARCHAR(128) NULL,
  ADD COLUMN founder_email VARCHAR(191) NULL,
  ADD COLUMN founder_phone VARCHAR(32) NULL,
  ADD COLUMN founder_linkedin VARCHAR(512) NULL,

  ADD COLUMN headquarters_country VARCHAR(128) NULL,
  ADD COLUMN headquarters_city VARCHAR(128) NULL,

  ADD COLUMN legal_structure VARCHAR(128) NULL,
  ADD COLUMN registration_number VARCHAR(128) NULL,
  ADD COLUMN tax_id VARCHAR(128) NULL,

  ADD COLUMN primary_market VARCHAR(128) NULL,
  ADD COLUMN target_markets TEXT NULL,
  ADD COLUMN operating_countries TEXT NULL,
  ADD COLUMN problem_statement TEXT NULL,
  ADD COLUMN solution_description TEXT NULL,
  ADD COLUMN key_features TEXT NULL,
  ADD COLUMN target_customer VARCHAR(255) NULL,
  ADD COLUMN value_proposition TEXT NULL,
  ADD COLUMN market_size VARCHAR(128) NULL,
  ADD COLUMN competitive_advantage TEXT NULL,
  ADD COLUMN main_competitors TEXT NULL,
  ADD COLUMN market_penetration VARCHAR(64) NULL,

  ADD COLUMN customer_acquisition_cost VARCHAR(64) NULL,
  ADD COLUMN customer_lifetime_value VARCHAR(64) NULL,
  ADD COLUMN monthly_active_users VARCHAR(64) NULL,
  ADD COLUMN revenue_growth_rate VARCHAR(64) NULL,
  ADD COLUMN key_performance_indicators TEXT NULL,

  ADD COLUMN funding_stage VARCHAR(64) NULL,
  ADD COLUMN funding_raised VARCHAR(64) NULL,
  ADD COLUMN monthly_burn_rate VARCHAR(64) NULL,
  ADD COLUMN runway VARCHAR(64) NULL,
  ADD COLUMN seeking_investment VARCHAR(32) NULL,
  ADD COLUMN investment_amount_needed VARCHAR(64) NULL,
  ADD COLUMN use_of_funds TEXT NULL,
  ADD COLUMN previous_investors TEXT NULL,
  ADD COLUMN investment_timeline VARCHAR(128) NULL,

  ADD COLUMN product_type TEXT NULL,
  ADD COLUMN intellectual_property TEXT NULL,

  ADD COLUMN social_mission TEXT NULL,
  ADD COLUMN impact_metrics TEXT NULL,
  ADD COLUMN sdg_alignment TEXT NULL,
  ADD COLUMN beneficiaries VARCHAR(255) NULL,

  ADD COLUMN preferred_contact_method VARCHAR(64) NULL,
  ADD COLUMN best_time_to_contact VARCHAR(128) NULL,

  ADD COLUMN demo_video VARCHAR(512) NULL,
  ADD COLUMN press_coverage TEXT NULL,
  ADD COLUMN awards_recognition TEXT NULL,
  ADD COLUMN partnerships TEXT NULL;


