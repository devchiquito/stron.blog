import { signal } from "@preact/signals";
import { Exercise } from "../interfaces/Exercise";
import { AddExerciseModal } from "../modals/AddExercise";
import { AddRecordModal } from "../modals/AddRecord";

const isOpenAddExerciseModal = signal(false);
export const recordModal = signal({
  isOpen: false,
  name: "",
  maxWeight: 0,
});

export function Dashboard({ exercises }: { exercises: Exercise[] }) {
  const openRecordModal = (name: string, maxWeight: number) => {
    recordModal.value = {
      isOpen: true,
      name,
      maxWeight,
    };
  };
  return (
    <div className="space-y-4 ">
      <AddRecordModal />
      <div class={"flex justify-end"}>
        <button onClick={() => (isOpenAddExerciseModal.value = true)}>
          Add exercise
        </button>
        <AddExerciseModal isOpen={isOpenAddExerciseModal} />
      </div>
      {exercises.map((exercise, index) => (
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
            {new Date(exercise.lastModified).toLocaleDateString()}
          </p>
          <div>
            {exercise.records.map((record, recordIndex) => (
              <div key={recordIndex}>
                <p>
                  {new Date(record.date).toLocaleDateString()} - {record.weight}{" "}
                  kg - {record.reps} reps
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
