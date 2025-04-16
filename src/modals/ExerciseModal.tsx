import { signal } from "@preact/signals";
import { appData } from "../app";
import { Exercise } from "../interfaces/Exercise";

const isOpen = signal<"add" | "edit" | null>(null);
const name = signal("");
const tags = signal<string[]>([]);
const id = signal("");

export const openExerciseModal = () => (isOpen.value = "add");

export const openExerciseModalAndEdit = (exercise: Exercise) => {
  isOpen.value = "edit";
  name.value = exercise.name;
  tags.value = exercise.tags;
  id.value = exercise.id;
};

const addNewExercise = () => {
  appData.value = [
    ...appData.value,
    {
      name: name.value,
      tags: tags.value,
      records: [],
      lastModified: new Date(),
      maxWeight: 0,
      id: crypto.randomUUID(),
    },
  ];
  isOpen.value = null;
};

export const editExercise = () => {
  const result: Exercise[] = appData.value.map((ex) => {
    if (ex.id === id.value) {
      ex.name = name.value;
      ex.tags = tags.value;
    }
    return ex;
  });

  appData.value = result;
  isOpen.value = null;
};

export function ExerciseModal() {
  return (
    <div
      class={`fixed inset-0 z-10 bg-[rgba(0,0,0,0.8)] ${
        isOpen.value ? "" : "hidden pointer-events-none"
      }`}
    >
      <div class="fixed inset-0 z-20 flex items-center justify-center">
        <div class="w-full max-w-md p-6 bg-zinc-800 rounded-lg shadow-lg">
          <div class="flex justify-between mb-4">
            <h2 class="text-2xl font-bold mb-4">
              {isOpen.value === "add" ? "Add exercise" : "Edit exercise"}
            </h2>
            <button onClick={() => (isOpen.value = null)}>X</button>
          </div>
          <form
            class="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (isOpen.value === "add") {
                addNewExercise();
              } else if (isOpen.value === "edit") {
                editExercise();
              }
            }}
          >
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
                type="submit"
                class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                {isOpen.value === "add" ? "Add" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
