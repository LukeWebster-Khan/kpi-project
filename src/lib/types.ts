export type PartialKPI = {
  assigned?: string;
  team?: string;
};

export type FullKPI = PartialKPI & {
  penquiry?: string;
  wenquiry?: string;
  oenquiry?: string;
  qualifications?: string;
  proposals?: string;
  quotes?: string;
  enqorders?: string;
  totalquotes?: string;
  appuptake?: string;
  quotefollowup?: string;
  target?: string;
  tunits?: string;
  actual?: string;
  aunits?: string;
  runits: string;
  cancelled?: string;
  cancelmargin?: string;
  cancelprocessing?: string;
};

export type KPImeta = {
  businessday: string;
  businessdays: string;
  displaymonth: string;
  iscurrentmonth: string;
  lastmonth: string;
  nextmonth: string;
  slastmonth: string;
  snextmonth: string;
  success: boolean;
};
