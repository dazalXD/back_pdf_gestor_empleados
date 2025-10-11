// src/routes/ModelDocuments.js
const express = require('express');
const router = express.Router();
const docsCtrl = require('../controller/documentsController'); // ajusta la ruta si tu carpeta es controllers/controller
const verifyToken = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: Documents
 *     description: CRUD y generación de PDFs/ZIPs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         contract:
 *           type: string
 *           example: "C-12345"
 *         balance:
 *           type: number
 *           format: double
 *           example: 2000.50
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-10-11"
 *         phone:
 *           type: string
 *           example: "5512345678"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-11T22:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-11T22:05:00Z"
 *
 *     CreateDocumentRequest:
 *       type: object
 *       required:
 *         - name
 *         - contract
 *         - balance
 *         - date
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         contract:
 *           type: string
 *           example: "C-12345"
 *         balance:
 *           type: number
 *           example: 2000.5
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-10-11"
 *         phone:
 *           type: string
 *           example: "5512345678"
 *
 *     GenerateZipRequest:
 *       type: object
 *       required:
 *         - ids
 *       properties:
 *         ids:
 *           type: array
 *           items:
 *             type: integer
 *           example: [1, 2, 3]
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Descripción del error"
 */

/**
 * @swagger
 * /documents:
 *   get:
 *     tags: [Documents]
 *     summary: Listar documentos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de documentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', verifyToken, docsCtrl.getAllResgistersDocuments);

/**
 * @swagger
 * /documents:
 *   post:
 *     tags: [Documents]
 *     summary: Crear un nuevo registro de documento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDocumentRequest'
 *     responses:
 *       201:
 *         description: Documento creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: Campos faltantes / inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error del servidor
 */
router.post('/', verifyToken, docsCtrl.createResgisterDocument);

/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     tags: [Documents]
 *     summary: Obtener documento por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del documento
 *     responses:
 *       200:
 *         description: Documento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Documento no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', verifyToken, docsCtrl.getDocumentResgister);

/**
 * @swagger
 * /documents/pdf/{id}:
 *   get:
 *     tags: [Documents]
 *     summary: Genera y descarga un PDF de un documento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del documento
 *     responses:
 *       200:
 *         description: PDF generado
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Documento no encontrado
 */
router.get('/pdf/:id', verifyToken, docsCtrl.generateSingle);

/**
 * @swagger
 * /documents/pdf:
 *   post:
 *     tags: [Documents]
 *     summary: Genera un ZIP con múltiples PDFs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: ZIP generado
 *         content:
 *           application/zip:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Documentos no encontrados
 */
router.post('/pdf', verifyToken, docsCtrl.generateMultipleZip);

/**
 * @swagger
 * /documents/{id}:
 *   put:
 *     tags: [Documents]
 *     summary: Actualiza un documento por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del documento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDocumentRequest'
 *     responses:
 *       200:
 *         description: Documento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Documento no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', verifyToken, docsCtrl.updateDocumentById);

/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     tags: [Documents]
 *     summary: Elimina un documento por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del documento a eliminar
 *     responses:
 *       200:
 *         description: Documento eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Documento eliminado"
 *       404:
 *         description: Documento no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', verifyToken, docsCtrl.deleteDocumentById);

module.exports = router;
