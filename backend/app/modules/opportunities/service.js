import { Opportunity } from './model.js';

export const list = () => Opportunity.findAll({ order: [['id','DESC']] });
export const get = (id) => Opportunity.findByPk(id);
export const create = (data) => Opportunity.create(data);
export const update = async (id, data) => { const o = await Opportunity.findByPk(id); if (!o) return null; return o.update(data); };
export const remove = (id) => Opportunity.destroy({ where: { id } });

export default { list, get, create, update, remove };





