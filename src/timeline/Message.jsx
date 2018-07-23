import React from 'react';

export default ({ content, timestamp }) => (
  <li key={timestamp}>
    {content.text}<br />
    <small>{new Date(timestamp).toISOString().split('T').join(' ')}</small>
  </li>
);
