import { signal } from "@preact/signals";
import { appData } from "../app";
import { isEnglish } from "../components/Header";

const isOpen = signal<null | "add" | "edit">(null);

const name = signal("");
const date = signal(new Date());
const weight = signal(0);
const reps = signal(0);
const id = signal("");

export const openRecordModal = (exerciseName: string, maxWeight: number) => {
  isOpen.value = "add";
  name.value = exerciseName;
  weight.value = maxWeight;
};

export const openRecordModalAndEdit = (record: any) => {
  isOpen.value = "edit";
  name.value = record.name;
  date.value = new Date(record.date);
  weight.value = record.weight;
  reps.value = record.reps;
  id.value = record.id;
};

const addNewRecord = () => {
  appData.value = appData.value.map((ex) => {
    if (ex.name === name.value) {
      ex.records.push({
        date: date.value,
        name: name.value,
        reps: reps.value,
        weight: weight.value,
        id: crypto.randomUUID(),
      });
      ex.lastModified = new Date();
      ex.maxWeight = Math.max(ex.maxWeight, weight.value);
    }
    return ex;
  });
  isOpen.value = null;
};

const editRecord = () => {
  appData.value = appData.value.map((ex) => {
    if (ex.name === name.value) {
      ex.records = ex.records.map((record) => {
        if (record.id === id.value) {
          record.date = date.value;
          record.weight = weight.value;
          record.reps = reps.value;
        }
        return record;
      });
      ex.lastModified = new Date();
    }
    return ex;
  });
  isOpen.value = null;
};

const deleteRecord = () => {
  appData.value = appData.value.map((ex) => {
    if (ex.name === name.value) {
      ex.records = ex.records.filter((record) => record.id !== id.value);
      ex.lastModified = new Date();
    }
    return ex;
  });
  isOpen.value = null;
};

export function RecordModal() {
  return (
    <div
      id="modal-background"
      class={`fixed inset-0 z-10 bg-[rgba(0,0,0,0.8)] ${
        isOpen.value ? "" : "hidden pointer-events-none"
      }`}
    >
      <div class="fixed inset-0 z-20 flex items-center justify-center">
        <div class="w-full max-w-md p-6 bg-zinc-800 rounded-lg shadow-lg">
          <div class="flex justify-between mb-4">
            <h2 class="text-2xl font-bold mb-4">
              {isOpen.value === "add"
                ? isEnglish.value
                  ? "Add set"
                  : "Añadir serie"
                : isEnglish.value
                ? "Edit set"
                : "Editar serie"}
            </h2>
            <button
              onClick={() => {
                isOpen.value = null;
              }}
            >
              X
            </button>
          </div>
          <form
            class="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (isOpen.value === "add") {
                addNewRecord();
              } else if (isOpen.value === "edit") {
                editRecord();
              }
            }}
          >
            <label class="block" htmlFor="date">
              {isEnglish.value ? "Date" : "Fecha"}
              <input
                type="date"
                id="date"
                required
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={date.value.toISOString().split("T")[0]}
                onInput={(e) => {
                  const [year, month, day] = (
                    e.target as HTMLInputElement
                  ).value.split("-");
                  date.value = new Date(
                    Number(year),
                    Number(month) - 1,
                    Number(day)
                  );
                }}
              />
            </label>
            <label class="block" htmlFor="weight">
              {isEnglish.value ? "Weight" : "Peso"}
              <input
                type="number"
                step="any"
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
              {isEnglish.value ? "Reps" : "Repeticiones"}
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
            <div class="flex justify-end gap-3">
              {isOpen.value === "edit" && (
                <button onClick={() => deleteRecord()}>
                  {isEnglish.value ? "Delete set" : "Eliminar serie"}
                </button>
              )}
              <button
                type="submit"
                class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                {isOpen.value === "add"
                  ? isEnglish.value
                    ? "Add set"
                    : "Añadir serie"
                  : isEnglish.value
                  ? "Edit set"
                  : "Editar serie"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
