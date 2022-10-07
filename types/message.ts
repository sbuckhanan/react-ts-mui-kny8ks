export type Message = {
  id: number;
  timestamp: Date;
  text: string;
  senderUserId: number;
  conversationUserId: number;
};
