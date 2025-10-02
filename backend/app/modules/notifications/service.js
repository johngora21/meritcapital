import { Notification } from './model.js';

export const list = (user_id) => Notification.findAll({ where: { user_id }, order: [['id','DESC']] });
export const create = (data) => Notification.create(data);
export const markRead = async (id, user_id) => {
  const n = await Notification.findOne({ where: { id, user_id } });
  if (!n) return null;
  return n.update({ read: true });
};

export default { list, create, markRead };





