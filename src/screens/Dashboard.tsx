import { computed } from "@preact/signals";
import { appData } from "../app";
import {
  ButtonLoadExampleData,
  isInDemoMode,
} from "../components/ButtonLoadExampleData";
import { isEnglish } from "../components/Header";
import { RecordsSection } from "../components/RecordsSection";
import { openExerciseModal } from "../modals/ExerciseModal";
import { openRecordModal } from "../modals/RecordModal";

const sortedExercises = computed(() =>
  appData.value.sort(
    (a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  )
);

export function Dashboard() {
  return (
    <div className="space-y-4 fade-in">
      {sortedExercises.value.length === 0 && (
        <p>
          {isEnglish.value
            ? "You don't have any exercises registered yet, you can add exercises with the button below or you can load example data to see how the app works."
            : "Aun no tienes ejercicios registrados, puedes añadir ejercicios con el boton de abajo o puedes cargar datos de ejemplo para ver como funciona la app."}
        </p>
      )}
      {isInDemoMode.value && (
        <p>
          {isEnglish.value
            ? "You are in demo mode, you can add exercises with the button below or you can delete all data in the Settings."
            : "Estas en modo demo, puedes agregar ejercicios con el boton de abajo o puedes eliminar todos los datos en los Ajustes."}
        </p>
      )}

      <div class={"flex justify-center"}>
        <button
          onClick={() => openExerciseModal()}
          class="text-lime-500 border border-lime-500"
        >
          {isEnglish.value ? "Add exercise" : "Añadir Ejercicio"}
        </button>
      </div>
      {sortedExercises.value.length === 0 && (
        <div class={"flex justify-center"}>
          <ButtonLoadExampleData />
        </div>
      )}
      {sortedExercises.value.map((exercise) => (
        <button
          key={exercise.id}
          className="p-4 bg-white shadow rounded-lg w-full"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-left">{exercise.name} </h2>

            <button
              onClick={() => openRecordModal(exercise.name, exercise.maxWeight)}
              class="text-sky-500 border border-sky-500"
            >
              {isEnglish.value ? "Add set" : "Añadir serie"}
            </button>
          </div>

          <RecordsSection records={exercise.records} />
          <div className="mb-5   text-xs  ">
            {isEnglish.value ? "Tags: " : "Etiquetas: "}
            {exercise.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className=" text-sky-400   ">
                {tag.toUpperCase()}
                {tagIndex < exercise.tags.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <span class={"text-zinc-400 text-xs "}>
            {isEnglish.value ? "Last modified" : "Ultima modificacion"}:{" "}
            {new Date(exercise.lastModified).toLocaleString()}
          </span>
        </button>
      ))}
    </div>
  );
}
