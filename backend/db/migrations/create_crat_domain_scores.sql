CREATE TABLE IF NOT EXISTS crat_domain_scores (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  assessment_id BIGINT UNSIGNED NOT NULL,
  domain_id BIGINT UNSIGNED NOT NULL,
  actual_score INT DEFAULT 0,
  target_score INT DEFAULT 0,
  readiness_pct DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY crat_domain_scores_assessment_id_domain_id_unique (assessment_id, domain_id),
  FOREIGN KEY (assessment_id) REFERENCES crat_assessments(id) ON DELETE CASCADE,
  FOREIGN KEY (domain_id) REFERENCES crat_domains(id) ON DELETE CASCADE
);
