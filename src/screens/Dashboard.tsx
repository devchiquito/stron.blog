import { isEnglish } from "../components/Header";
import { RecordsSection } from "../components/RecordsSection";
import { Exercise } from "../interfaces/Exercise";
import { openExerciseModal } from "../modals/ExerciseModal";
import { openRecordModal } from "../modals/RecordModal";

export function Dashboard({ exercises }: { exercises: Exercise[] }) {
  const sortedExercises = [...exercises].sort(
    (a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  );

  return (
    <div className="space-y-4 w-full">
      <div class={"flex justify-end"}>
        <button onClick={() => openExerciseModal()}>
          {isEnglish.value ? "Add exercise" : "Añadir Ejercicio"}
        </button>
      </div>
      {sortedExercises.map((exercise) => (
        <button
          key={exercise.id}
          className="p-4 bg-white shadow rounded-lg w-full"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-left">{exercise.name} </h2>

            <button
              onClick={() => openRecordModal(exercise.name, exercise.maxWeight)}
            >
              {isEnglish.value ? "Add set" : "Añadir serie"}
            </button>
          </div>
          <div className="mb-5 flex flex-wrap space-x-2">
            {exercise.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-block text-sky-400 border border-sky-400 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <RecordsSection records={exercise.records} />
          <span class={"text-zinc-400 text-xs "}>
            {isEnglish.value ? "Last modified" : "Ultima modificacion"}:{" "}
            {new Date(exercise.lastModified).toLocaleString()}
          </span>
        </button>
      ))}
    </div>
  );
}
