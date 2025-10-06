import { Investor } from './model.js';

export const list = () => Investor.findAll({ order: [['id','DESC']] });
export const get = (id) => Investor.findByPk(id);
export const create = (data) => Investor.create(data);
export const update = async (id, data) => { const i = await Investor.findByPk(id); if (!i) return null; return i.update(data); };
export const remove = (id) => Investor.destroy({ where: { id } });

export default { list, get, create, update, remove };






