// import { User } from

import { Message } from '../types/message';
import { User } from '../types/user';
import { loggedInUser, userMessagesMap, users } from './testData';

const maxDelayMiliseconds = 500;

// Returns a promise that resolves with the given value after a random amount of time less than maxDelayMiliseconds
// To simulate a HTTP request.
const promisify = <T>(response: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, maxDelayMiliseconds * Math.random());
  });
};

export const api = {
  getUsers: () => promisify(users),
  getMessages: (userId: number) => promisify(userMessagesMap[userId] || []),
  getLoggedInUser: () => promisify(loggedInUser),
};
