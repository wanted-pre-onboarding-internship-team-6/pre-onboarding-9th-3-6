export interface ChartData {
  [timestamp: string]: {
    id: string;
    value_bar: number;
    value_area: number;
  };
}

export interface ChartDataResponse {
  type: string;
  version: number;
  response: ChartData;
}

export interface ReformedChartData {
  bar: number;
  area: number;
  region: string;
  timestamp: string;
}
