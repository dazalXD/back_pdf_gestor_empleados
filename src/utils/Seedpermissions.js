const Permission = require('../models/ModelPermission'); // Asegúrate de que esta ruta sea correcta

// Definición de los permisos basados en tu interfaz
const initialPermissions = [
    { name: 'Acceso al Módulo de Usuarios', key: 'users.access' },
    { name: 'Acceso al Módulo de Documentos', key: 'documents.access' },
    { name: 'Crear Nuevos Usuarios', key: 'users.create' },
    { name: 'Eliminar Documentos', key: 'documents.delete' },
    { name: 'Modificar Permisos', key: 'permissions.manage' },
];

async function seedPermissions() {
    console.log('--- Initializing Permissions ---');
    try {
        for (const permData of initialPermissions) {
            // Busca si el permiso ya existe por su 'key'
            const [permission, created] = await Permission.findOrCreate({
                where: { key: permData.key },
                defaults: permData,
            });

            if (created) {
                console.log(`[OK] Permiso '${permData.name}' creado.`);
            } else {
                // Opcional: Si existe, asegurar que el 'name' sea el correcto
                if (permission.name !== permData.name) {
                    permission.name = permData.name;
                    await permission.save();
                    console.log(`[UPDATE] Permiso '${permData.key}' actualizado.`);
                } else {
                    console.log(`[SKIP] Permiso '${permData.name}' ya existe.`);
                }
            }
        }
        console.log('--- Permissions Initialization Complete ---');
    } catch (error) {
        console.error('ERROR during permission seeding:', error.message);
    }
}

module.exports = { seedPermissions };