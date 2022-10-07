import React from 'react';
import { User } from '../../types/user';

export const MessageListComponent = ({
  allUsers,
  loggedInUser,
  selectedUserId,
}: {
  allUsers: User[];
  loggedInUser: User;
  selectedUserId: number;
}) => {
  // Get Messages from API

  if (!selectedUserId) {
    return <div>Select a user</div>;
  }

  // Display Messages
  return (
  <div>
    <h1>{selectedUserId}</h1>
    <p>TODO: Display Messages from User {selectedUserId}</p>
  </div>
  )
};
