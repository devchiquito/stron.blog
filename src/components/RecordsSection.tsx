import { Serie } from "../interfaces/Record";
import { isEnglish } from "./Header";
import RecordsChart from "./RecordsGraph";

export const RecordsSection = ({ records }: { records: Serie[] }) => {
  const bestRecordsByDay: { [key: string]: Serie } = {};

  records.forEach((record) => {
    const dateString = new Date(record.date).toISOString().split("T")[0];

    if (
      !bestRecordsByDay[dateString] ||
      record.weight > bestRecordsByDay[dateString].weight ||
      (record.weight === bestRecordsByDay[dateString].weight &&
        record.reps > bestRecordsByDay[dateString].reps)
    ) {
      bestRecordsByDay[dateString] = record;
    }
  });

  const bestRecordsArray = Object.values(bestRecordsByDay);

  return (
    <div class={"my-4"}>
      <RecordsChart bestRecordsArray={bestRecordsArray} />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-center">
              {isEnglish.value ? "Date" : "Fecha"}
            </th>
            <th className="px-4 py-2 text-center">
              {isEnglish.value ? "Weight" : "Peso"} (kg)
            </th>
            <th className="px-4 py-2 text-center">Reps</th>
          </tr>
        </thead>
        <tbody>
          {bestRecordsArray
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((record) => (
              <tr key={record.id} className="hover:bg-zinc-800 border-b">
                <td className="px-4 py-2 text-center">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">{record.weight}</td>
                <td className="px-4 py-2 text-center">{record.reps}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
