import React from 'react';

export default message => (
  <li key={message.timestamp}>
    {message.content || message.message}<br />
    <small>{new Date(message.timestamp).toString()}</small>
  </li>
);
