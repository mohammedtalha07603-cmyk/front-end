import React from 'react';

const STAR_COUNT = 5;

function StarRating({ rating }) {
  return (
    <div className="stars" aria-label={`Rating: ${rating} out of ${STAR_COUNT}`}>
      {Array.from({ length: STAR_COUNT }, (_, i) => {
        const filled   = i < Math.floor(rating);
        const halfFill = !filled && i < rating;
        return (
          <span key={i} style={{ color: filled || halfFill ? '#f59e0b' : '#2e3547' }}>
            {filled ? '★' : halfFill ? '⯨' : '☆'}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
