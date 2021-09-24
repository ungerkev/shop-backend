const parentDirFinder = require('find-parent-dir');
import { join } from 'path';

/**
 * General configuration
 */
export const appPort = process.env.HTTP_PORT || 3000;

// DB paths
export const modelsDir = join(parentDirFinder.sync(__dirname, 'db_models'), 'db_models');
