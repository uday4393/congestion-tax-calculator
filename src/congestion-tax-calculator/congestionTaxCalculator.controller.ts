import { Request, Response } from 'express';
import { vehicleConfig } from './vehicleType.model';
import TaxCalculator from './congestionTaxCalculator';
const configFilePath = 'taxRules.json';

const congestionTaxCalculatorContoller = async (req: Request, res: Response) => {
  const { vehicleType, dateTimes } = req.body;

  if (!dateTimes || !Array.isArray(dateTimes) || !dateTimes.length) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const taxCalculator = new TaxCalculator(configFilePath);
  const totalTax = taxCalculator.calculateTotalTax(vehicleType, dateTimes);
  return res.json({ totalTax });
};

export default congestionTaxCalculatorContoller;
