interface UserSettings {
  beginOfPeriod: number;
  endOfPeriod: number;
  currency: string;
  email: string;
  prevPeriod: PreviousPeriodData[];
  rate: number;
  id: string;
  firstConfig: boolean;
  timeSpan: number;
}

interface UserShift {
  email: string;
  id: string;
  begin: string;
  end: string;
  date: string;
  time: number;
}

interface PreviousPeriodData {
  begin: number;
  end: number;
  prevSum: number;
  hoursWorked: number;
}
