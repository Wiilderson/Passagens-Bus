export interface Substop {
  id: string;
  name: string;
  url?: string;
  type?: string;
  parentCity?: string;
}

export interface City {
  id: string;
  name: string;
  url: string;
  type: string;
  substops: Substop[];
}

export interface ScheduleResult {
  id: string;
  company: {
    id: string;
    name: string;
  };
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
  availableSeats: number;
  withBPE: boolean;
  departure: {
    date: string;
    time: string;
  };
  arrival: {
    date: string;
    time: string;
  };
  travelDuration: number;
  travelDistance: string;
  seatClass: string;
  price: {
    seatPrice: number;
    taxPrice: number;
    price: number;
  };
  insurance: number;
  allowCanceling: boolean;
  travelCancellationLimitDate: string;
  travelCancellationFee: number;
  manualConfirmation: boolean;
  CPFRequired: boolean;
}
