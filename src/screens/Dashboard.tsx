import { RecordsSection } from "../components/RecordsSection";
import { Exercise } from "../interfaces/Exercise";
import { ExerciseModal, openExerciseModal } from "../modals/ExerciseModal";
import { openRecordModal, RecordModal } from "../modals/RecordModal";

export function Dashboard({ exercises }: { exercises: Exercise[] }) {
  const sortedExercises = [...exercises].sort(
    (a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  );

  return (
    <div className="space-y-4 w-full">
      <RecordModal />
      <div class={"flex justify-end"}>
        <button onClick={() => openExerciseModal()}>Add exercise</button>
        <ExerciseModal />
      </div>
      {sortedExercises.map((exercise, index) => (
        <button key={index} className="p-4 bg-white shadow rounded-lg w-full">
          <div className="flex justify-between items-center">
            <div class={"flex gap-2 items-center"}>
              <h2 className="text-xl font-bold">{exercise.name} </h2>
              <span
                class={
                  "text-lime-400 text-[9px] border border-lime-400 rounded p-1"
                }
              >
                Max {exercise.maxWeight}
              </span>
            </div>
            <button
              onClick={() => openRecordModal(exercise.name, exercise.maxWeight)}
            >
              Add record
            </button>
          </div>{" "}
          <div className="mb-5 flex flex-wrap space-x-2">
            {exercise.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <RecordsSection records={exercise.records} />
          <span class={"text-zinc-400 text-xs "}>
            Last modified: {new Date(exercise.lastModified).toLocaleString()}
          </span>
        </button>
      ))}
    </div>
  );
}
