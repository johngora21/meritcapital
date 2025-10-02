import { SuccessStory } from './model.js';

export const list = () => SuccessStory.findAll({ order: [['id','DESC']] });
export const get = (id) => SuccessStory.findByPk(id);
export const create = (data) => SuccessStory.create(data);
export const update = async (id, data) => { const s = await SuccessStory.findByPk(id); if (!s) return null; return s.update(data); };
export const remove = (id) => SuccessStory.destroy({ where: { id } });

export default { list, get, create, update, remove };





