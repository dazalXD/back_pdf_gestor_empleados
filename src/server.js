const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const Permission = require('./utils/Seedpermissions');
const CreateUser = require('./utils/CreateUserAdmin');

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors()); // responder preflight

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const docRoutes = require('./routes/documents');
const permissionRouter = require('./routes/permissions');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', docRoutes);
app.use('/api/permissions', permissionRouter);

// --- Swagger setup ---4
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API - Backend gestion de empleados',
        version: '1.0.0',
        description: 'API para gestión de empleados, permisos y generación de PDFs',
        // contact: { name: 'Tu equipo', email: 'dev@example.com' },
    },
    servers: [
        { url: `http://localhost:${process.env.PORT || 3000}/api`, description: 'Local server' }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {            // JWT Bearer
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};

const options = {
    swaggerDefinition,
    // Ajusta estas rutas si colocas tus JSDoc en otros archivos
    apis: [
        "./src/routes/auth.js",
        "./src/routes/user.js",
        "./src/routes/documents.js",
        "./src/routes/permissions.js"
    ],
};

const swaggerSpec = swaggerJsdoc(options);

app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await sequelize.authenticate();
        console.log('DB connected');

        await sequelize.sync({ alter: true });
        // Seed initial permissions
        await Permission.seedPermissions();
        // Create super admin user if not exists
        await CreateUser.CreateSuperAdmin();

        app.listen(PORT, () => console.log('Server on', PORT));
    } catch (err) {
        console.error(err);
    }
}

start();