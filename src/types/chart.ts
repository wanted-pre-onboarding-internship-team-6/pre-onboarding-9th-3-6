import type { ChartTypeRegistry, ChartOptions as Options } from 'chart.js';

export type ChartType = keyof ChartTypeRegistry;
export type ChartOptions = Options<ChartType>;
