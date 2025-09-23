import { Chat, ChatMessage, ChatParticipant } from './model.js';

export const listChats = async (userId) => Chat.findAll({
  include: [{ model: ChatParticipant, as: 'participants', where: { user_id: userId } }],
  order: [['id','DESC']],
});

export const createChat = async ({ title, userId }) => {
  const chat = await Chat.create({ title, created_by: userId });
  await ChatParticipant.create({ chat_id: chat.id, user_id: userId, role: 'owner' });
  return chat;
};

export const postMessage = async ({ chat_id, sender_id, content }) => ChatMessage.create({ chat_id, sender_id, content });
export const listMessages = async (chat_id) => ChatMessage.findAll({ where: { chat_id }, order: [['created_at','ASC']] });

export default { listChats, createChat, postMessage, listMessages };

