import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const Chat = sequelize.define('chats', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(191), allowNull: true },
  created_by: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

export const ChatParticipant = sequelize.define('chat_participants', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  chat_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  role: { type: DataTypes.ENUM('owner','member'), defaultValue: 'member' },
}, { timestamps: true, createdAt: 'added_at', updatedAt: false });

export const ChatMessage = sequelize.define('chat_messages', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  chat_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  sender_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false });

Chat.hasMany(ChatParticipant, { foreignKey: 'chat_id', as: 'participants' });
ChatParticipant.belongsTo(Chat, { foreignKey: 'chat_id' });
Chat.hasMany(ChatMessage, { foreignKey: 'chat_id', as: 'messages' });
ChatMessage.belongsTo(Chat, { foreignKey: 'chat_id' });

export default { Chat, ChatParticipant, ChatMessage };





