import { Exercise } from "../interfaces/Exercise";
import { ExerciseModal, openExerciseModal } from "../modals/ExerciseModal";
import { openRecordModal, RecordModal } from "../modals/RecordModal";

export function Dashboard({ exercises }: { exercises: Exercise[] }) {
  const sortedExercises = [...exercises].sort(
    (a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  );

  return (
    <div className="space-y-4">
      <RecordModal />
      <div class={"flex justify-end"}>
        <button onClick={() => openExerciseModal()}>Add exercise</button>
        <ExerciseModal />
      </div>
      {sortedExercises.map((exercise, index) => (
        <button key={index} className="p-4 bg-white shadow rounded-lg w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{exercise.name}</h2>
            <button
              onClick={() => openRecordModal(exercise.name, exercise.maxWeight)}
            >
              Add record
            </button>
          </div>
          <p class={"text-zinc-400"}>
            Max: {exercise.maxWeight} kg - Last modified:{" "}
            {new Date(exercise.lastModified).toLocaleString()}
          </p>
          <div>
            {[...exercise.records]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((record, recordIndex) => (
                <div
                  key={recordIndex}
                  class={"flex justify-between items-center"}
                >
                  <p>
                    {new Date(record.date).toLocaleDateString()} -{" "}
                    {record.weight} kg - {record.reps} reps
                  </p>
                </div>
              ))}
          </div>
          <div className="mt-2 flex flex-wrap space-x-2">
            {exercise.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
