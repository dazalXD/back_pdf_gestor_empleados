const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { inWorkHours } = require('../middleware/checkWorkSchedule');
require('dotenv').config();

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const user = await User.findOne({ where: { username } });
  console.log(user);

  if (!user)
    return res.status(401).json({ message: 'Credenciales incorrectas', status: res.statusCode });

  if (user.status === 'baja')
    return res.status(403).json({ message: 'Usuario dado de baja' });

  // horario
  if (user.start_work && user.end_work) {
    if (!inWorkHours(user.start_work, user.end_work)) {
      return res.status(403).json({ message: 'Fuera de horario de trabajo' });
    }
  }

  const ok = await user.checkPassword(password);

  if (!ok) return res.status(401).json({ message: 'Credenciales incorrectas' });

  if (user.status === 'cambiar_contraseña') {
    // indicar al frontend que debe mostrar UI cambio de contraseña
    const token = jwt.sign({ id: user.id, username: user.username, mustChangePassword: true }, process.env.JWT_SECRET, { expiresIn: '15m' });
    return res.json({ mustChangePassword: true, token });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '8h' });

  const safeUser = user.toJSON();
  delete safeUser.password;

  res.json({ token, user: safeUser });
};

exports.changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ message: 'Usuario no existe' });
  const ok = await user.checkPassword(oldPassword);
  if (!ok) return res.status(400).json({ message: 'Contraseña actual incorrecta' });
  user.password = newPassword;
  user.status = 'activo';
  await user.save();
  res.json({ message: 'Contraseña cambiada' });
};
