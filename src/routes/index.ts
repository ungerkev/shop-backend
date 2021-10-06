import 'reflect-metadata';
import express from 'express';
import Container from 'typedi';

import { StatusController } from '../controller/status.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import {ProductController} from "../controller/product.controller";

const statusController = Container.get(StatusController);
const productController = Container.get(ProductController);

const authMiddleware = Container.get(AuthMiddleware);

const router = express.Router();

/**
 * Status Routes
 */
router.get('/', authMiddleware.isAuthenticated, statusController.status);

/**
 * Product Routes
 */
router.get('/products', productController.getProductsController);
router.post('/product', productController.saveNewProductController);

module.exports = router;
