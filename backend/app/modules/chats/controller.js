import svc from './service.js';

export const myChats = async (req, res, next) => {
  try { res.json({ data: await svc.listChats(req.user.id) }); } catch (e) { next(e); }
};
export const create = async (req, res, next) => {
  try { const chat = await svc.createChat({ title: req.body.title, userId: req.user.id }); res.status(201).json({ data: chat }); } catch (e) { next(e); }
};
export const send = async (req, res, next) => {
  try { const msg = await svc.postMessage({ chat_id: req.params.id, sender_id: req.user.id, content: req.body.content }); res.status(201).json({ data: msg }); } catch (e) { next(e); }
};
export const messages = async (req, res, next) => {
  try { res.json({ data: await svc.listMessages(req.params.id) }); } catch (e) { next(e); }
};

export default { myChats, create, send, messages };

// DTO for chats list (cards in sidebar)
import { Chat, ChatMessage, ChatParticipant } from './model.js';

export const listCards = async (req, res, next) => {
  try {
    const rows = await Chat.findAll({
      include: [
        { model: ChatParticipant, as: 'participants' },
        { model: ChatMessage, as: 'messages', limit: 1, order: [['created_at','DESC']] },
      ],
      order: [['updated_at','DESC']],
    });
    const data = rows.map((c) => ({
      id: String(c.id),
      name: c.title || (c.participants?.[0]?.user_name || 'Conversation'),
      type: (c.participants?.length || 0) > 1 ? 'group' : 'private',
      participants: (c.participants || []).map(p => ({
        id: String(p.user_id),
        name: p.user_name || `User ${p.user_id}`,
        type: p.user_type || 'entrepreneur',
        avatar: p.user_avatar || '',
        company: p.user_company || '',
        title: p.user_title || '',
        online: false,
        lastSeen: undefined,
      })),
      lastMessage: c.messages && c.messages[0] ? {
        id: String(c.messages[0].id),
        senderId: String(c.messages[0].sender_id),
        content: c.messages[0].content,
        timestamp: new Date(c.messages[0].created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        read: true,
      } : undefined,
      unreadCount: 0,
      isActive: false,
      created: new Date(c.created_at).toISOString(),
    }));
    res.json({ data });
  } catch (e) { next(e); }
};

