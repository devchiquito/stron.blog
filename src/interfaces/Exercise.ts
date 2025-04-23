import { Serie } from "./Record";

export interface Exercise {
  name: string;
  tags: string[];
  records: Serie[];
  lastModified: Date;
  maxWeight: number;
  id: string;
}
