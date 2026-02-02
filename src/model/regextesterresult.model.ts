export interface Match {
  name: string;
  index: number;
  length: number;
  value: string;
}

export interface RegExTesterResult {
  matches: Match[];
}
