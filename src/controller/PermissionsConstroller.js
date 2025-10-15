const permission = require('../models/ModelPermission');
const UserPermissions = require('../models/ModelUserPermission');

exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await permission.findAll({
            attributes: ['id', 'name', 'key', 'createdAt'] // traer solo campos necesarios
        });
        res.json(permissions);
    } catch (error) {
        console.error('Error al obtener permisos', error);
        res.status(500).json({ message: 'Error al obtener permisos' });
    }
};

exports.getPermissionsByUserId = async (req, res) => {
    try {
        const { UserId } = req.params;

        const permisions = await UserPermissions.findAll({
            where: { UserId },
            attributes: ['userId', 'permissionId']
        });
        res.json(permisions);
    } catch (error) {
        console.error('Error al obtener permisos del usuario', error);
        res.status(500).json({ message: 'Error al obtener permisos del usuario' });
    }
};