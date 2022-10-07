import { Message } from '../types/message';
import { User } from '../types/user';

const pipeDelmitedUserNames = [
  "Br'er|Rabbit",
  'Peter|Rabbit',
  'Oswald|the Lucky Rabbit',
  'Bugs|Bunny',
  'Jessica|Rabbit',
  'Roger|Rabbit',
  'Judy|Hopps',
  'Buster|Baxter',
  'Lola|Bunny',
  'Hazel|',
  'Easter|Bunny',
];

const conversations = [
  ['wanna party tonight?', 'yep!'],
  [
    'hey how you doing?',
    "I'm good! How are you?",
    "Good I'm glad to hear it! Whatcha doing tonight?",
    "I don't think anything, but I'll have to double check when my girlfirend gets home.",
    'sick let me know. I got a party brewing over here',
  ],
  [
    'hey',
    'hey',
    'you around tonight? party at my place! the parents are out of town!',
    'heck yeah, Ill be there.',
  ],
  [
    'wanna come over tonight? My parents are out of town so we gonna throw a party!',
    "I'm assuming you didn't mean to send that to me... I'm gonna have to let your mom know. Sorry gotta be responsible",
    'oh crap.',
  ],
];

export const users: User[] = pipeDelmitedUserNames.map((name, index) => {
  const [firstName, lastName] = name.split('|');
  return {
    id: index + 1,
    firstName,
    lastName,
    avatarUrl: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
  } as User;
});

export const loggedInUser = users[0];

export const userMessagesMap = users.reduce((messageMap, user) => {
  const textList = conversations[(user.id - 1) % conversations.length];
  const userMessages = textList.map((text, index) => {
    return {
      id: index,
      timestamp: null,
      text,
      senderUserId: index % 2 === 0 ? loggedInUser.id : user.id,
      conversationUserId: user.id,
    } as Message;
  });
  messageMap[user.id] = userMessages;

  // Loop in reverse to add times
  let lastTime: number = new Date().getTime();
  for (var i = userMessages.length - 1; i >= 0; i--) {
    const message = userMessages[i];
    const timeGap = Math.random() * (1000 * 60 * 9) + 1000 * 60; // random time gap between 1 minute and 10 mintues
    const newTime = lastTime - timeGap;
    message.timestamp = new Date(newTime);
    lastTime = newTime;
  }
  return messageMap;
}, {} as { [key: string]: Message[] });

// Set lastMessageSentAt field for users
users.forEach((user) => {
  const messages = userMessagesMap[user.id];
  const lastMessage = messages[messages.length - 1];
  user.lastMessageSentAt = lastMessage.timestamp;
});
