import { Request, Response, NextFunction } from 'express';
import { getTax } from './congestionTaxCalculator';
import Vehicle from '../../vehicle';

const congestionTaxCalculatorContoller = async (req: Request, res: Response, next: NextFunction) => {
  const vehicle = req.body?.vehicle;
  const dates = req.body?.dates;
  console.log(vehicle, dates);
  // if (!vehicle || !dates) return res.status(400).send("Bad Request");

  const dummy: Vehicle = {
    getVehicleType: () => {
      return 'adasda';
    },
  };
  const DatesTest = [
    '2013-01-14 21:00:00',
    '2013-01-15 21:00:00',
    '2013-02-07 06:23:27', // 8
    '2013-02-07 15:27:00', // 13
    '2013-02-07 15:40:00', // 18
    '2013-02-08 06:27:00', // 8
    '2013-02-08 06:20:27', // 8
    '2013-02-08 14:35:00', // 8
    '2013-02-08 15:29:00', // 13
    '2013-02-08 15:47:00', // 18
    '2013-02-08 16:01:00', // 18
    '2013-02-08 16:48:00', // 18
    '2013-02-08 17:49:00', // 13
    '2013-02-08 18:29:00', // 8
    '2013-02-08 18:35:00',
    '2013-03-26 14:25:00',
    '2013-03-28 14:07:27',
  ];

  const sortedDates = DatesTest.map((date) => new Date(date)).sort((a, b) => (new Date(a) > new Date(b) ? 1 : -1));
  console.log('sortedDates ???????????????????????????????', sortedDates);

  const totalFee = getTax(
    dummy,
    DatesTest.map((date) => new Date(date)),
  );
  console.log('totalFee', totalFee);
  return res.send({ totalFee, currency: 'SEK' });
};

export default congestionTaxCalculatorContoller;

// const sort = [
//   2013-01-14T20:00:00.000Z,
//   2013-01-15T20:00:00.000Z,
//   2013-02-07T05:23:27.000Z,
//   2013-02-07T14:27:00.000Z,
//   2013-02-07T14:40:00.000Z,
//   2013-02-08T05:20:27.000Z,
//   2013-02-08T05:27:00.000Z,
//   2013-02-08T13:35:00.000Z,
//   2013-02-08T14:29:00.000Z,
//   2013-02-08T14:47:00.000Z,
//   2013-02-08T15:01:00.000Z,
//   2013-02-08T15:48:00.000Z,
//   2013-02-08T16:49:00.000Z,
//   2013-02-08T17:29:00.000Z,
//   2013-02-08T17:35:00.000Z,
//   2013-03-26T13:25:00.000Z,
//   2013-03-28T13:07:27.000Z
// ]
