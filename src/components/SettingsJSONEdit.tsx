import { appData } from "../app";
import { signal } from "@preact/signals";
import { isEnglish } from "./Header";

const showSureButton = signal(false);
const showTextarea = signal(false);
const textAreaValue = signal("");

const handleSaveChanges = () => {
  showSureButton.value = true;
};

const handleShowSureButton = () => {
  localStorage.setItem(
    "myAppData",
    JSON.stringify(JSON.parse(textAreaValue.value))
  );
  window.location.reload();
};

export function SettingsJSONEdit() {
  return (
    <>
      <button onClick={() => (showTextarea.value = !showTextarea.value)}>
        {isEnglish.value ? "Edit JSON data" : "Editar datos JSON"}
      </button>
      {showTextarea.value && (
        <div class="p-4 w-full min-w-[300px]">
          <textarea
            class="w-full p-2 mb-4"
            value={JSON.stringify(appData.value, null, 2)}
            onChange={(e) =>
              (textAreaValue.value = (e.target as HTMLTextAreaElement)?.value)
            }
            rows={20}
          />

          <div class="flex items-center gap-5">
            <button
              class="bg-green-500 hover:bg-green-700"
              onClick={handleSaveChanges}
            >
              {isEnglish.value ? "Save changes" : "Guardar cambios"}
            </button>{" "}
            {showSureButton.value && (
              <button
                class=" bg-yellow-500 hover:bg-yellow-700"
                onClick={handleShowSureButton}
              >
                {isEnglish.value ? "Are you sure?" : "Estas seguro?"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
