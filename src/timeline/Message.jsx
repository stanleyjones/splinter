import React from 'react';
import { Feed } from 'semantic-ui-react';
import moment from 'moment';

export default ({ content, timestamp }) => (
  <Feed.Event key={timestamp}>
    <Feed.Label><img alt="avatar" src="http://placekitten.com/50/50" /></Feed.Label>
    <Feed.Content>
      <Feed.Summary>
        <Feed.User>{content.author || "Joe User"}</Feed.User>
        <Feed.Date>{moment(timestamp).fromNow()}</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text>{content.text}</Feed.Extra>
    </Feed.Content>
  </Feed.Event>
);
