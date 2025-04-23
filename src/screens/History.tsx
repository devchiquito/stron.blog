import { appData } from "../app";
import { isEnglish } from "../components/Header";
import { openRecordModalAndEdit } from "../modals/RecordModal";

export function History() {
  const allRecords = appData.value
    .flatMap((exercise) => exercise.records)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <>
      {allRecords.length === 0 ? (
        <p>
          {isEnglish.value
            ? "You don't have any records saved yet. Add records to your exercises on the board."
            : "Aun no tienes series guardadas. Añade series a tus ejercicios en el tablero."}
        </p>
      ) : (
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">
                {isEnglish.value ? "Exercise" : "Ejercicio"}
              </th>
              <th class="px-4 py-2">{isEnglish.value ? "Date" : "Fecha"}</th>
              <th class="px-4 py-2">
                {isEnglish.value ? "Weight" : "Peso"} (kg)
              </th>
              <th class="px-4 py-2">Reps</th>
            </tr>
          </thead>
          <tbody>
            {allRecords.map((record) => (
              <tr class="hover:bg-zinc-800">
                <td class="border px-4 py-2">
                  {record.name}{" "}
                  <a onClick={() => openRecordModalAndEdit(record)}>
                    {isEnglish.value ? "Edit" : "Editar"}
                  </a>
                </td>
                <td class="border px-4 py-2">
                  {new Date(record.date).toLocaleString()}
                </td>
                <td class="border px-4 py-2">{record.weight} kg</td>
                <td class="border px-4 py-2">{record.reps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
