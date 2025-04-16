import { Record } from "./Record";

export interface Exercise {
  name: string;
  tags: string[];
  records: Record[];
  lastModified: Date;
  maxWeight: number;
  id: string;
}
