const { User } = require('../models');
require('dotenv').config();

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'status', 'start_work', 'end_work', 'createdAt'] // traer solo campos necesarios
        });

        res.json(users);

    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
}

exports.createUser = async (req, res) => {
    try {
        const { username, password, status, start_work, end_work } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'username y password son requeridos' });
        }

        // verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Este nombre de usuario ya existe' });
        }

        // crear usuario
        const user = await User.create({ username, password, status, start_work, end_work });
        res.status(201).json({
            message: 'usuario creado',
            username: user.username
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario' });
        console.error('Error al crear usuario', error);
    }

}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['username', 'status', 'start_work', 'end_work', 'createdAt'] // traer solo campos necesarios
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);

    } catch (error) {
        console.error('Error al obtener usuario', error);
        res.status(404).json({ message: 'Error al obtener usuario' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.destroy();
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar usuario', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, status, start_work, end_work } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (username && username !== user.username) {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Este nombre de usuario ya existe' });
            }
        }

        user.username = username || user.username;
        if (password) user.password = password;
        user.status = status || user.status;
        user.start_work = start_work || user.start_work;
        user.end_work = end_work || user.end_work;
        await user.save();
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error('Error al actualizar usuario', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
}

