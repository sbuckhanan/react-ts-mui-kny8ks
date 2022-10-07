import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { useApiCall } from '../../utils/useApiCallHook';
import { MessageListComponent } from '../messagesList/messagesList';
import { UserComponent } from '../user/user';
import './userPage.css';

export const UsersPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>();

  // create constants for users api:
  // [response, isLoading, makeApiCall]
  const [users, loadingUsers, makeGetUsersRequest] = useApiCall(api.getUsers);

  // create constants for logged in user api
  const [loggedInUser, loadingLoggedInUser, makeGetLoggedInUserRequest] =
    useApiCall(api.getLoggedInUser);

  // An effect to initiate the api calls, runs automatically on init
  useEffect(() => {
    makeGetUsersRequest(null);
    makeGetLoggedInUserRequest(null);
  }, []); // Empty array [], means we will run this effect only when the componenet is first created

  const loading = loadingUsers || loadingLoggedInUser;

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="user-page">
      <div className="user-list">
        {users?.map(
          (user) =>
            loggedInUser.id !== user.id && (
              <UserComponent
                user={user}
                key={user.id}
                selected={selectedUserId === user.id}
                onClick={() => setSelectedUserId(user.id)}
              />
            )
        )}
      </div>
      <div className="message-list">
        <MessageListComponent
          allUsers={users}
          selectedUserId={selectedUserId}
          loggedInUser={loggedInUser}
        />
      </div>
    </div>
  );
};
