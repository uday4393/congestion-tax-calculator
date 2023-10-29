import express from 'express';
import swaggerUi = require('swagger-ui-express');

import fs = require('fs');
import congestionTaxCalculatorContoller from '../controllers/congestionTaxCalculator.controller';

/* Swagger files start */
const swaggerFile: any = process.cwd() + '/swagger.json';
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
/* Swagger files end */

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Congestion Tax Calculator API, Use /api/docs to view the documentation');
});

router.use('/api/docs', swaggerUi.serve);
router.get('/api/docs', swaggerUi.setup(swaggerDocument));

router.get('/api/congestion-tax-calculator', congestionTaxCalculatorContoller);

export default router;
