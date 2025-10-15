const User = require('../models/ModelUser.js');
const Permission = require('../models/ModelPermission.js');
const UserPermission = require('../models/ModelUserPermission.js'); 
const { sequelize } = require('../models');

async function CreateSuperAdmin() {
    let admin = await User.findOne({ where: { username: 'admin' } });

    if (!admin) {
        admin = await User.create({
            username: 'admin',
            password: '123456',
            status: 'activo',
            start_work: '00:00:00',
            end_work: '23:59:59'
        });
        console.log('Admin user created.');
    } else {
        console.log('Admin user already exists');
    }

    const allPermissions = await Permission.findAll({ attributes: ['id'] });
    const permissionIds = allPermissions.map(p => p.id);

    if (admin.setPermissions) {
        await admin.setPermissions(permissionIds);
        console.log('[PERMS OK] Asignados con setPermissions.');

    } else {
        await UserPermission.destroy({ where: { userId: admin.id } }); 
        const userPermissions = permissionIds.map(permId => ({
            userId: admin.id,
            permissionId: permId
        }));
        await UserPermission.bulkCreate(userPermissions);
        console.log('[PERMS OK] Asignados con bulkCreate (fallback).');
    }

    console.log(`[PERMS OK] ${permissionIds.length} permisos asignados al usuario 'admin'.`);
}

module.exports = { CreateSuperAdmin };