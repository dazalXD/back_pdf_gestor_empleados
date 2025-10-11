module.exports = (permKey) => {
  return async (req, res, next) => {
    const userId = req.user?.id;
    // ejemplo sencillo: consulta permisos desde DB (User -> Permission)
    const { User } = require('../models');
    const user = await User.findByPk(userId, { include: ['permissions'] });
    const has = user.permissions?.some(p => p.key === permKey);
    if (!has) return res.status(403).json({ message: 'Sin permiso' });
    next();
  };
};
