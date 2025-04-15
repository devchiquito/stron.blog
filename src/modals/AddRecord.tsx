import { signal } from "@preact/signals";
import { appData } from "../app";
import { recordModal } from "../screens/Dashboard";

const date = signal(new Date().toISOString().split("T")[0]);
const weight = signal(0);
const reps = signal(0);

export function AddRecordModal() {
  const handleAddRecord = () => {
    const exercise = appData.value.find(
      (ex) => ex.name === recordModal.value.name
    );
    if (exercise) {
      exercise.records.push({
        date: new Date(date.value + "T00:00:00"),
        weight: weight.value,
        reps: reps.value,
        name: recordModal.value.name,
      });
      exercise.lastModified = new Date();
      exercise.maxWeight = Math.max(exercise.maxWeight, weight.value);

      localStorage.setItem("myAppData", JSON.stringify(appData.value));
    }
    recordModal.value = { ...recordModal.value, isOpen: false };
  };
  console.log(recordModal.value);

  return (
    <div
      id="modal-background"
      class={`fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity ${
        recordModal.value.isOpen ? "" : "hidden pointer-events-none"
      }`}
    >
      <div class="fixed inset-0 z-20 flex items-center justify-center">
        <div class="w-full max-w-md p-6 bg-zinc-800 rounded-lg shadow-lg">
          <div class="flex justify-between mb-4">
            <h2 class="text-2xl font-bold mb-4">Add record</h2>
            <button
              onClick={() => {
                recordModal.value = { ...recordModal.value, isOpen: false };
                console.log("Closigng modal");
              }}
            >
              X
            </button>
          </div>
          <form
            class="space-y-4"
            onSubmit={() => {
              handleAddRecord();
            }}
          >
            <label class="block" htmlFor="date">
              Date
              <input
                type="date"
                id="date"
                required
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={date.value}
                onInput={(e) =>
                  (date.value = (e.target as HTMLInputElement).value)
                }
              />
            </label>
            <label class="block" htmlFor="weight">
              Weight
              <input
                type="number"
                id="weight"
                required
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={weight.value}
                onInput={(e) =>
                  (weight.value = Number((e.target as HTMLInputElement).value))
                }
              />
            </label>
            <label class="block" htmlFor="reps">
              Reps
              <input
                type="number"
                id="reps"
                required
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={reps.value}
                onInput={(e) =>
                  (reps.value = Number((e.target as HTMLInputElement).value))
                }
              />
            </label>
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700"
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
