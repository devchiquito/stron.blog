import { signal } from "@preact/signals";
import { appData } from "../app";
import { SettingsJSONEdit } from "../components/SettingsJSONEdit";
import { openExerciseModalAndEdit } from "../modals/ExerciseModal";
import { isEnglish } from "../components/Header";

const showSureButton = signal(false);
const showExercises = signal(false);
const showSureExercise = signal(false);
const nameExerciseToDelete = signal("");

const deleteExercise = () => {
  appData.value = appData.value.filter(
    (ex) => ex.name !== nameExerciseToDelete.value
  );
  localStorage.setItem("myAppData", JSON.stringify(appData.value));
  window.location.reload();
};

export function Settings() {
  return (
    <>
      <div class="grid gap-4 w-full">
        <button onClick={() => (showExercises.value = !showExercises.value)}>
          {isEnglish.value ? "Edit exercises" : "Editar ejercicios"}
        </button>
        {showExercises.value && (
          <ul class="bg-zinc-800 rounded-lg p-4">
            {appData.value.map((exercise) => (
              <li
                key={exercise.id}
                class="mb-2 flex justify-between items-center gap-6 "
              >
                <span>{exercise.name}</span>
                <div class={"flex gap-2"}>
                  <button
                    onClick={() => {
                      openExerciseModalAndEdit(exercise);
                    }}
                  >
                    {isEnglish.value ? "Edit" : "Editar"}
                  </button>
                  <button
                    onClick={() => {
                      showSureExercise.value = true;
                      nameExerciseToDelete.value = exercise.name;
                    }}
                  >
                    {isEnglish.value ? "Delete" : "Borrar"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {showSureExercise.value && (
          <div
            class="fixed inset-0 z-10 bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <div class="bg-zinc-800 rounded-lg p-4">
              <div class={"flex justify-between mb-4 items-center"}>
                <p class="font-bold text-lg">
                  {isEnglish.value ? "Are you sure?" : "Estas seguro?"}
                </p>
                <button onClick={() => (showSureExercise.value = false)}>
                  X
                </button>
              </div>
              <p class="my-4">
                {isEnglish.value ? (
                  <>
                    This action will delete the exercise "
                    {nameExerciseToDelete.value}" and it can't be undone.
                  </>
                ) : (
                  <>
                    Esta accion borrara el ejercicio "
                    {nameExerciseToDelete.value}" y no se podra deshacer.
                  </>
                )}
              </p>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  deleteExercise();
                }}
              >
                {isEnglish.value ? "Sure?" : "Seguro?"}
              </button>
            </div>
          </div>
        )}
        <button onClick={() => (showSureButton.value = true)}>
          {isEnglish.value ? "Delete all data" : "Borrar todos los datos"}
        </button>
        {showSureButton.value && (
          <div
            class="fixed inset-0 z-10 bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <div class="bg-zinc-800 rounded-lg p-4">
              <div class={"flex justify-between mb-4 items-center"}>
                <p class="font-bold text-lg">
                  {isEnglish.value ? "Are you sure?" : "Estas seguro?"}
                </p>
                <button onClick={() => (showSureButton.value = false)}>
                  X
                </button>
              </div>
              <p class="my-4">
                {isEnglish.value
                  ? "This action will delete all your data and it can't be undone."
                  : "Esta accion borrara todos tus datos y no se puede deshacer."}
              </p>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  localStorage.removeItem("myAppData");
                  window.location.reload();
                }}
              >
                {isEnglish.value ? "Delete all data" : "Borrar todos los datos"}
              </button>
            </div>
          </div>
        )}
        <SettingsJSONEdit />
      </div>
    </>
  );
}
