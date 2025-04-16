import { Record } from "../interfaces/Record";
import RecordsChart from "./RecordsGraph";

export const RecordsSection = ({ records }: { records: Record[] }) => {
  // Objeto para almacenar el mejor record por cada día
  const bestRecordsByDay: { [key: string]: Record } = {};

  // Iterar sobre los records y determinar el mejor record por día
  records.forEach((record) => {
    console.log(record);
    // Convertir la fecha a string para usarla como clave en el objeto
    const dateString = new Date(record.date).toISOString().split("T")[0];

    // Si aún no hay ningún record para este día o el nuevo record es mejor
    if (
      !bestRecordsByDay[dateString] ||
      record.weight > bestRecordsByDay[dateString].weight ||
      (record.weight === bestRecordsByDay[dateString].weight &&
        record.reps > bestRecordsByDay[dateString].reps)
    ) {
      bestRecordsByDay[dateString] = record;
    }
  });

  // Filtrar el objeto para obtener solo los mejores records por día como array
  const bestRecordsArray = Object.values(bestRecordsByDay);

  return (
    <div class={"my-4"}>
      <RecordsChart bestRecordsArray={bestRecordsArray} />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-center">Date</th>
            <th className="px-4 py-2 text-center">Weight (kg)</th>
            <th className="px-4 py-2 text-center">Reps</th>
          </tr>
        </thead>
        <tbody>
          {bestRecordsArray
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((record, recordIndex) => (
              <tr key={recordIndex} className="hover:bg-gray-100 border-b">
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
