import React from 'react';

const Loader = () => (
  <div className="spinner">
    {Array.from({length: 5}).map((item, idx) => (
      <div key={idx} className="spinner__ring" />
    ))}
  </div>
);

export default Loader;
