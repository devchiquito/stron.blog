import { Record } from "../interfaces/Record";

export function History({ records }: { records: Record[] }) {
  return (
    <ul class="space-y-2">
      {records.map((record, index) => (
        <li key={index} class="flex justify-between">
          <span class="font-bold">{record.name}</span>
          <span>
            {record.reps} reps @ {record.weight}kg
          </span>
        </li>
      ))}
    </ul>
  );
}
