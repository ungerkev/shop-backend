import 'reflect-metadata';
import express from 'express';
import Container from 'typedi';

import { StatusController } from '../controller/status.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const statusController = Container.get(StatusController);
const authMiddleware = Container.get(AuthMiddleware);

const router = express.Router();

/**
 * Status Routes
 */
router.get('/', authMiddleware.isAuthenticated, statusController.status);

module.exports = router;
