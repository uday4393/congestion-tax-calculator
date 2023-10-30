export enum VehicleType {
  Car = 'Car',
  Bus = 'Bus',
  Motorcycle = 'Motorcycle',
  Emergency = 'Emergency',
  Diplomat = 'Diplomat',
  Foreign = 'Foreign',
  Military = 'Military',
}

export const vehicleConfig: Record<VehicleType, string> = {
  [VehicleType.Car]: 'Car',
  [VehicleType.Bus]: 'Bus',
  [VehicleType.Motorcycle]: 'Motorcycle',
  [VehicleType.Emergency]: 'Emergency',
  [VehicleType.Diplomat]: 'Diplomat',
  [VehicleType.Foreign]: 'Foreign',
  [VehicleType.Military]: 'Military',
};
