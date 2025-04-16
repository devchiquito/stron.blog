import { appData } from "../app";
import { openRecordModalAndEdit, RecordModal } from "../modals/RecordModal";

export function History() {
  const allRecords = appData.value
    .flatMap((exercise) => exercise.records)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  console.log(allRecords);
  return (
    <table class="table-auto w-full">
      <RecordModal />
      <thead>
        <tr>
          <th class="px-4 py-2">Exercise</th>
          <th class="px-4 py-2">Date</th>
          <th class="px-4 py-2">Weight</th>
          <th class="px-4 py-2">Reps</th>
        </tr>
      </thead>
      <tbody>
        {allRecords.map((record) => (
          <tr class="hover:bg-gray-100">
            <td class="border px-4 py-2">
              {record.name}{" "}
              <a onClick={() => openRecordModalAndEdit(record)}>Edit</a>
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
  );
}
