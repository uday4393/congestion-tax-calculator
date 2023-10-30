import fs from 'fs';
import path from 'path';
import { DateTime } from 'luxon';
import { TaxRulesConfig } from './taxRule.model';
import { VehicleType } from './vehicleType.model';
import { MAX_AMOUNT_PER_DAY } from './constants';

class TaxCalculator {
  private taxRules: TaxRulesConfig;

  constructor(configFilePath: string) {
    const fullPath = path.resolve(__dirname, configFilePath);
    this.taxRules = this.loadTaxRules(fullPath);
  }

  private loadTaxRules(filePath: string): TaxRulesConfig {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  }

  public calculateTotalTax(vehicleType: VehicleType, dateTimes: string[]): number {
    let totalTax = 0; // Total tax for all date-times
    let dailyTax = 0; // Daily limit is 60 SEK

    if (!this.isTaxableVehicleType(vehicleType)) {
      // Vehicle type is exempt from tax, return 0 for all date-times.
      return totalTax;
    }

    for (const dateTime of dateTimes) {
      if (this.isWithinYear2013(dateTime) && this.isTaxable(dateTime)) {
        const taxForDateTime = this.calculateTax(dateTime);
        // Check if adding tax for this date-time would exceed the daily limit.
        if (dailyTax + taxForDateTime <= MAX_AMOUNT_PER_DAY) {
          dailyTax += taxForDateTime;
          totalTax += taxForDateTime;
        }
      }
    }

    return totalTax;
  }

  private isWithinYear2013(dateTime: string): boolean {
    const parsedDateTime = DateTime.fromFormat(dateTime, 'yyyy-MM-dd HH:mm:ss');
    return parsedDateTime.year === 2013;
  }

  private isTaxable(dateTime: string): boolean {
    const parsedDateTime = DateTime.fromFormat(dateTime, 'yyyy-MM-dd HH:mm:ss');
    const dayOfWeek = parsedDateTime.weekday;
    const month = parsedDateTime.month;
    const day = parsedDateTime.day;

    if (
      dayOfWeek > 1 &&
      dayOfWeek < 7 && // Monday to Friday
      month !== 7 && // Not in July
      !this.isPublicHoliday(month, day)
    ) {
      return true;
    }

    return false;
  }

  private isTaxableVehicleType(vehicleType: VehicleType): boolean {
    // Check if the vehicle type is in the exemptions list from the configuration file.
    return !Object.values(VehicleType).includes(vehicleType);
  }

  private isPublicHoliday(month: number, day: number): boolean {
    // Add logic to check if the date is a public holiday for Gothenburg in 2013 - subject to change.
    const customHolidays = [
      { month: 1, day: 1 }, // New Year's Day
      { month: 3, day: 28 }, // Maundy Thursday
      { month: 3, day: 29 }, // Good Friday
      { month: 4, day: 1 }, // Easter Monday
      { month: 4, day: 30 }, // Walpurgis Night
      { month: 5, day: 1 }, // May Day (International Workers' Day)
      { month: 5, day: 8 }, // Ascension Day
      { month: 5, day: 9 }, // Day after Ascension Day
      { month: 6, day: 5 }, // National Day of Sweden
      { month: 6, day: 6 }, // National Day of Sweden
      { month: 6, day: 21 }, // Midsummer Eve
      { month: 11, day: 1 }, // All Saints' Day
      { month: 12, day: 24 }, // Day before Christmas Eve
      { month: 12, day: 25 }, // Christmas Day
      { month: 12, day: 26 }, // Boxing Day (Second Day of Christmas)
      { month: 12, day: 31 }, // New Year's Eve
    ];

    return customHolidays.some((holiday) => holiday.month === month && holiday.day === day);
  }

  public calculateTax(dateTime: string): number {
    const { city, rules } = this.taxRules;

    if (city !== 'Gothenburg') {
      return 0; // No tax rules for other cities
    }

    const parsedDateTime = DateTime.fromFormat(dateTime, 'yyyy-MM-dd HH:mm:ss');
    const dayOfWeek = parsedDateTime.weekday;
    const hourMinute = parsedDateTime.toFormat('HH:mm:ss');

    if (
      dayOfWeek < 5 && // Monday to Friday
      hourMinute >= '06:00:00' && // Taxable hours start
      hourMinute <= '18:29:59' // Taxable hours end
    ) {
      let maxTax = 0;
      for (const rule of rules) {
        if (hourMinute >= rule.start_time && hourMinute <= rule.end_time) {
          maxTax = Math.max(maxTax, rule.amount);
        }
      }
      return maxTax;
    }

    return 0;
  }
}

export default TaxCalculator;
