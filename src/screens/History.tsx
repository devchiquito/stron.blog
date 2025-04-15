import { Record } from "../interfaces/Record";

export function History() {
  const records: Record[] = [
    { name: "Push-up", reps: 10, weight: 0, date: new Date("2022-01-01") },
    { name: "Squat", reps: 12, weight: 50, date: new Date("2022-01-02") },
    { name: "Plank", reps: 0, weight: 0, date: new Date("2022-01-03") },
    { name: "Push-up", reps: 12, weight: 0, date: new Date("2022-01-04") },
    { name: "Squat", reps: 15, weight: 60, date: new Date("2022-01-05") },
    { name: "Plank", reps: 0, weight: 0, date: new Date("2022-01-06") },
  ];

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
