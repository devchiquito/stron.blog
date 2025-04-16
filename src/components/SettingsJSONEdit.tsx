import { appData } from "../app";
import { signal } from "@preact/signals";

const showSureButton = signal(false);

const handleSaveChanges = () => {
  showSureButton.value = true;
};

const handleShowSureButton = () => {
  localStorage.setItem("myAppData", JSON.stringify(appData.value));
  window.location.reload();
};

export function SettingsJSONEdit() {
  return (
    <div class="p-4 w-full min-w-[300px]">
      <h2 class="text-2xl font-bold mb-4">Edit app data</h2>
      <textarea
        class="w-full p-2 mb-4"
        value={JSON.stringify(appData.value, null, 2)}
        onInput={(e) =>
          (appData.value = JSON.parse((e.target as HTMLTextAreaElement).value))
        }
        rows={20}
      />

      <div class="flex justify-between">
        <button
          class="bg-green-500 hover:bg-green-700"
          onClick={handleSaveChanges}
        >
          Save changes
        </button>
      </div>

      {showSureButton.value && (
        <button
          class="mt-4 bg-yellow-500 hover:bg-yellow-700"
          onClick={handleShowSureButton}
        >
          Are you sure?
        </button>
      )}
    </div>
  );
}
