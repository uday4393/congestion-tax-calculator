import { VehicleType } from './vehicleType.model';

export interface TaxRule {
  start_time: string;
  end_time: string;
  amount: number;
}

export interface TaxRulesConfig {
  city: string;
  rules: TaxRule[];
  exemptions: VehicleType[];
}
