import { Serie } from "./Serie";

export interface Exercise {
  name: string;
  tags: string[];
  records: Serie[];
  lastModified: Date;
  maxWeight: number;
  id: string;
}
