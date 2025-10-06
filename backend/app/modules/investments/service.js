import { Investment } from './model.js';

export const listMine = (investor_user_id) => Investment.findAll({ where: { investor_user_id }, order: [['id','DESC']] });
export const listAll = () => Investment.findAll({ order: [['id','DESC']] });
export const create = (data) => Investment.create(data);
export const remove = (id, investor_user_id) => Investment.destroy({ where: { id, investor_user_id } });

export default { listMine, listAll, create, remove };






