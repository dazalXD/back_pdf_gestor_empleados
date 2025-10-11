// src/routes/auth.js
const express = require('express');
const router = express.Router();
// Ajusta la ruta según tu carpeta: 'controllers' o 'controller'
const authCtrl = require('../controller/authController');

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticación
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Devuelve un token JWT (o mustChangePassword)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 mustChangePassword:
 *                   type: boolean
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', authCtrl.login);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     tags: [Auth]
 *     summary: Cambio de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - userId
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Contraseña cambiada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/change-password', authCtrl.changePassword);

module.exports = router;
