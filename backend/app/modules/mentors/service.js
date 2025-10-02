import { Mentor } from './model.js';

export const list = () => Mentor.findAll({ order: [['id','DESC']] });
export const get = (id) => Mentor.findByPk(id);
export const create = (data) => Mentor.create(data);
export const update = async (id, data) => { const m = await Mentor.findByPk(id); if (!m) return null; return m.update(data); };
export const remove = (id) => Mentor.destroy({ where: { id } });

export default { list, get, create, update, remove };





