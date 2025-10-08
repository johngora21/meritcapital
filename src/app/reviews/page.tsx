"use client";
import React from 'react';
import ProjectsPage from '../projects/page';

export default function ReviewsPage() {
  return (
    <div>
      <div className="proj-head">
        <div className="proj-head-content">
        <h2>Project Reviews</h2>
          <p>Review and approve submitted projects</p>
        </div>
      </div>
      <ProjectsPage isReviewMode={true} />
    </div>
  );
}