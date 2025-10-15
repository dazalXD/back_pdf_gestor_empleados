const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const checkPermission = require('../middleware/checkPermissions');
const permissionsCtrl = require('../controller/PermissionsConstroller');

/**
 * @swagger
 * tags:
 *   - name: Permissions
 *     description: Operaciones sobre permisos
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Permission:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Manage Users"
 *         key:
 *           type: string
 *           example: "users.manage"
 *         description:
 *           type: string
 *           example: "Permite gestionar usuarios del sistema"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-15T12:34:56.000Z"
 *       required:
 *         - id
 *         - name
 *         - key
 *
 */

/**
 * @swagger
 * /permissions:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Obtiene la lista de permisos (protegido)
 *     description: Devuelve todos los permisos. Requiere token Bearer y permiso `permissions.manage`.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *             examples:
 *               success:
 *                 value:
 *                   - id: 1
 *                     name: "Manage Users"
 *                     key: "users.manage"
 *                     description: "Permite gestionar usuarios"
 *                     createdAt: "2025-10-15T12:34:56.000Z"
 *                   - id: 2
 *                     name: "Manage Permissions"
 *                     key: "permissions.manage"
 *                     description: "Permite gestionar permisos"
 *                     createdAt: "2025-10-15T12:34:56.000Z"
 *       401:
 *         description: No autorizado — token inválido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido o no proporcionado"
 *       403:
 *         description: Prohibido — usuario sin permiso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para realizar esta acción"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener permisos"
 */
router.get('/', verifyToken, checkPermission('permissions.manage'), permissionsCtrl.getAllPermissions);

/**
 * @swagger
 * /permissions/{UserId}: 
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Obtiene todos los permisos de un usuario (protegido)
 *     description: Devuelve la lista de permisos asignados al usuario identificado por `UserId`. Requiere token Bearer y permiso `permissions.manage`.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: UserId
 *         in: path
 *         description: ID del usuario a consultar
 *         required: true
 *         schema:
 *           type: integer
 *           example: 42
 *     responses:
 *       200:
 *         description: Lista de permisos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *             examples:
 *               userPermissions:
 *                 value:
 *                   - id: 1
 *                     name: "View Users"
 *                     key: "users.view"
 *                     description: "Permite ver usuarios"
 *                     createdAt: "2025-10-15T12:34:56.000Z"
 *                   - id: 2
 *                     name: "Manage Permissions"
 *                     key: "permissions.manage"
 *                     description: "Permite gestionar permisos"
 *                     createdAt: "2025-10-15T12:34:56.000Z"
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Parámetros inválidos"
 *       401:
 *         description: No autorizado — token inválido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido o no proporcionado"
 *       403:
 *         description: Prohibido — usuario sin permiso `permissions.manage`
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para realizar esta acción"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener permisos del usuario"
 */
router.get('/:UserId', verifyToken, checkPermission('permissions.manage'), permissionsCtrl.getPermissionsByUserId);



module.exports = router;
