import { Avatar, Card, CardHeader, IconButton } from '@material-ui/core';
import React from 'react';
import { User } from '../../types/user';
import './user.css';

export const UserComponent = (props: {
  user: User;
  selected: boolean;
  onClick: () => unknown;
}) => {
  const { user, selected } = props;

  return (
    <div className={'user ' + (selected && 'selected')} onClick={props.onClick}>
      <div className="avatar">
        <img src={user.avatarUrl} />
      </div>
      <div className="info">
        <div className="primay">
          {user.firstName} {user.lastName}
        </div>
        <div className="secondary">
          Last Message: {user.lastMessageSentAt.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
