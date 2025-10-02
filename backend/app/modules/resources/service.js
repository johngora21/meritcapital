import { Resource } from './model.js';

export const list = (kind) => Resource.findAll({ where: kind ? { kind } : undefined, order: [['id','DESC']] });
export const get = (id) => Resource.findByPk(id);
export const create = (data) => Resource.create(data);
export const update = async (id, data) => { const r = await Resource.findByPk(id); if (!r) return null; return r.update(data); };
export const remove = (id) => Resource.destroy({ where: { id } });

export default { list, get, create, update, remove };





