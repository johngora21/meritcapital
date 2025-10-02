import { Startup } from './model.js';

export const list = () => Startup.findAll({ order: [['id','DESC']] });
export const get = (id) => Startup.findByPk(id);
export const create = (data) => Startup.create(data);
export const update = async (id, data) => { const s = await Startup.findByPk(id); if (!s) return null; return s.update(data); };
export const remove = (id) => Startup.destroy({ where: { id } });

export default { list, get, create, update, remove };





