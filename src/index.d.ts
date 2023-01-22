interface UserSettings {
  beginOfPeriod: number;
  endOfPeriod: number;
  currency: string;
  email: string;
  prevSum: number;
  rate: number;
  id: string;
  firstConfig: boolean;
}

interface UserShift {
  email: string;
  id: string;
  begin: string;
  end: string;
  date: string;
  time: number;
}
