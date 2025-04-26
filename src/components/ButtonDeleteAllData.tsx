import { signal } from "@preact/signals";
import { isEnglish } from "./Header";
import { changeScreen } from "../app";

const showSureButton = signal(false);

export const deleteAllData = () => {
  localStorage.removeItem("myAppData");
  changeScreen("Dashboard");
  window.location.reload();
};

export const ButtonDeleteAllData = () => (
  <>
    <button
      onClick={() => (showSureButton.value = true)}
      class={"text-red-500 border border-red-500"}
    >
      {isEnglish.value ? "Delete all data" : "Borrar todos los datos"}
    </button>
    {showSureButton.value && (
      <div
        class="fixed inset-0 z-10 bg-[rgba(0,0,0,0.8)] flex items-center justify-center "
        role="dialog"
        aria-modal="true"
      >
        <div class="bg-zinc-800 rounded-lg p-4">
          <div class={"flex justify-between mb-4 items-center"}>
            <p class="font-bold text-lg">
              {isEnglish.value ? "Are you sure?" : "Estas seguro?"}
            </p>
            <button onClick={() => (showSureButton.value = false)}>X</button>
          </div>
          <p class="my-4">
            {isEnglish.value
              ? "This action will delete all your data and it can't be undone."
              : "Esta accion borrara todos tus datos y no se puede deshacer."}
          </p>
          <button
            class="text-red-500 border border-red-500 font-bold py-2 px-4 rounded"
            onClick={() => deleteAllData()}
          >
            {isEnglish.value ? "Delete all data" : "Borrar todos los datos"}
          </button>
        </div>
      </div>
    )}
  </>
);
