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

  console.log("Mejores records por día:");
  console.log(bestRecordsArray);
  return (
    <div>
      {bestRecordsArray
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((record, recordIndex) => (
          <div key={recordIndex} class={"flex justify-between items-center"}>
            <p>
              {new Date(record.date).toLocaleDateString()} - {record.weight} kg
              - {record.reps} reps
            </p>
          </div>
        ))}
      <RecordsChart bestRecordsArray={bestRecordsArray} />
    </div>
  );
};
