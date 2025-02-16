export interface TimeCue {
  id: number;
  duration: number;  // in milliseconds
  name: string;
  active: boolean;
  // createdAt: Date;

}

export interface TimeBreakdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export enum TimeUnitInMilliseconds {
  milliseconds = 1,
  seconds = 1000,
  minutes = 60000,
  hours = 3600000,
  days = 86400000,
}