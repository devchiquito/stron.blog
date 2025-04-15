import { signal, Signal } from "@preact/signals";
import { appData } from "../app";

const name = signal("");
const tags = signal<string[]>([]);

export function AddExerciseModal({ isOpen }: { isOpen: Signal<boolean> }) {
  const handleAddExercise = () => {
    appData.value = [
      ...appData.value,
      {
        name: name.value,
        tags: tags.value,
        records: [],
        lastModified: new Date(),
        maxWeight: 0,
      },
    ];
    isOpen.value = false;
  };

  return (
    <div
      id="modal-background"
      class={`fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity ${
        isOpen.value ? "" : "hidden pointer-events-none"
      }
      }`}
    >
      <div class="fixed inset-0 z-20 flex items-center justify-center">
        <div class="w-full max-w-md p-6 bg-zinc-800 rounded-lg shadow-lg">
          <div class="flex justify-between mb-4">
            <h2 class="text-2xl font-bold mb-4">Add exercise</h2>
            <button onClick={() => (isOpen.value = false)}>X</button>
          </div>
          <form class="space-y-4">
            <label class="block" htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                required
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={name.value}
                onInput={(e) =>
                  (name.value = (e.target as HTMLInputElement).value)
                }
              />
            </label>
            <label class="block" htmlFor="tags">
              Tags
              <input
                type="text"
                id="tags"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={tags.value.join(", ")}
                onInput={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  tags.value = value.split(",").map((tag) => tag.trim());
                }}
              />
            </label>
            <div class="flex justify-end">
              <button
                type="button"
                class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700"
                onClick={handleAddExercise}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
