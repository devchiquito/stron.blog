import { appData } from "../app";
import { signal } from "@preact/signals";

const showSureButton = signal(false);
const showTextarea = signal(false);

const handleSaveChanges = () => {
  showSureButton.value = true;
};

const handleShowSureButton = () => {
  localStorage.setItem("myAppData", JSON.stringify(appData.value));
  window.location.reload();
};

export function SettingsJSONEdit() {
  return (
    <>
      <button onClick={() => (showTextarea.value = !showTextarea.value)}>
        Edit JSON data
      </button>
      {showTextarea.value && (
        <div class="p-4 w-full min-w-[300px]">
          <textarea
            class="w-full p-2 mb-4"
            value={JSON.stringify(appData.value, null, 2)}
            onInput={(e) =>
              (appData.value = JSON.parse(
                (e.target as HTMLTextAreaElement).value
              ))
            }
            rows={20}
          />

          <div class="flex items-center gap-5">
            <button
              class="bg-green-500 hover:bg-green-700"
              onClick={handleSaveChanges}
            >
              Save changes
            </button>{" "}
            {showSureButton.value && (
              <button
                class=" bg-yellow-500 hover:bg-yellow-700"
                onClick={handleShowSureButton}
              >
                Are you sure?
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
