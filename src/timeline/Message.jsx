import React from 'react';
import { Feed, Image } from 'semantic-ui-react';
import moment from 'moment';

export default ({ content, profile, timestamp }) => (
  <Feed.Event key={timestamp}>
    <Feed.Label><Image avatar src={profile.imgUrl} /></Feed.Label>
    <Feed.Content>
      <Feed.Summary>
        <Feed.User>{profile.name || "Joe User"}</Feed.User>
        <Feed.Date>{moment(timestamp).fromNow()}</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text>{content.text}</Feed.Extra>
    </Feed.Content>
  </Feed.Event>
);
