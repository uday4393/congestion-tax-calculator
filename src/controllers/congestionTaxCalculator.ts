import Vehicle from '../../vehicle';
import { MAX_AMOUNT_PER_DAY, TOLL_FREE_VEHICLES } from './constants';

export const getTax = (vehicle: Vehicle, dates: Date[], city: string = 'Gothenburg'): number => {
  let totalFee: number = 0;

  for (let i = 0; i < dates.length; i++) {
    console.log('<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>7||\n');
    let intervalStart: Date = dates[i - 1 == -1 ? 0 : i - 1];
    const date: Date = dates[i];
    console.log('DATE', date, intervalStart);
    let currentFee: number = getTollFee(date, vehicle);
    let prevFee: number = getTollFee(intervalStart, vehicle);
    console.log('prevFee', prevFee);
    console.log('currentFee', currentFee);

    let diffInMillies = date.getTime() - intervalStart.getTime();
    let minutes = Math.floor((diffInMillies / 1000 / 60) << 0);

    console.log('minutes', minutes);

    if (minutes <= 60) {
      //
      if (totalFee > 0) totalFee -= prevFee;
      if (currentFee >= prevFee) prevFee = currentFee;
      totalFee += prevFee;
    } else {
      totalFee += currentFee;
    }
    if (totalFee > MAX_AMOUNT_PER_DAY) totalFee = MAX_AMOUNT_PER_DAY;
    console.log('totalFee', totalFee);
  }
  return totalFee;
};

const isTollFreeVehicle = (vehicle: Vehicle): boolean => {
  if (vehicle == null) return false;
  const vehicleType: string = vehicle.getVehicleType();

  return TOLL_FREE_VEHICLES.includes(vehicleType);
};

const getTollFee = (date: Date, vechicle: Vehicle): number => {
  console.log(isTollFreeDate(date), isTollFreeVehicle(vechicle));
  if (isTollFreeDate(date) || isTollFreeVehicle(vechicle)) return 0;

  const hour: number = date.getHours();
  const minute: number = date.getMinutes();

  console.log('hour', hour, 'minute', minute);

  if (hour == 6 && minute >= 0 && minute <= 29) return 8;
  else if (hour == 6 && minute >= 30 && minute <= 59) return 13;
  else if (hour == 7 && minute >= 0 && minute <= 59) return 18;
  else if (hour == 8 && minute >= 0 && minute <= 29) return 13;
  else if (hour >= 8 && hour <= 14 && minute >= 30 && minute <= 59) return 8;
  else if (hour == 15 && minute >= 0 && minute <= 29) return 13;
  else if ((hour == 15 && minute >= 30) || (hour == 16 && minute <= 59)) return 18;
  else if (hour == 17 && minute >= 0 && minute <= 59) return 13;
  else if (hour == 18 && minute >= 0 && minute <= 29) return 8;
  else return 0;
};

const isTollFreeDate = (date: Date): boolean => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDay() + 1;
  const dayOfMonth: number = date.getDate();

  if (year == 2013) {
    if (day == 6 || day == 0) return true;
    if (
      (month == 1 && dayOfMonth == 1) ||
      (month == 3 && (dayOfMonth == 28 || dayOfMonth == 29)) ||
      (month == 4 && (dayOfMonth == 1 || dayOfMonth == 30)) ||
      (month == 5 && (dayOfMonth == 1 || dayOfMonth == 8 || dayOfMonth == 9)) ||
      (month == 6 && (dayOfMonth == 5 || dayOfMonth == 6 || dayOfMonth == 21)) ||
      month == 7 ||
      (month == 11 && dayOfMonth == 1) ||
      (month == 12 && (dayOfMonth == 24 || dayOfMonth == 25 || dayOfMonth == 26 || dayOfMonth == 31))
    ) {
      return true;
    }
  }
  return false;
};
