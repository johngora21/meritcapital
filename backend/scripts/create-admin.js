import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';
import { User } from '../app/modules/users/model.js';

async function main() {
  const email = process.env.ADMIN_EMAIL || 'johnjohngora@gmail.com';
  const password = process.env.ADMIN_PASSWORD || '99009900';
  const fullName = process.env.ADMIN_NAME || 'Super Admin';

  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });

    let user = await User.findOne({ where: { email } });
    const password_hash = await bcrypt.hash(password, 10);

    if (!user) {
      user = await User.create({ email, password_hash, full_name: fullName, role: 'admin' });
      console.log(`Created admin user ${email} (id=${user.id})`);
    } else {
      user.password_hash = password_hash;
      user.full_name = fullName;
      user.role = 'admin';
      await user.save();
      console.log(`Updated admin user ${email} (id=${user.id})`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Failed to create/update admin:', err);
    process.exit(1);
  }
}

main();


