import { signal } from "@preact/signals";
import { appData, changeScreen } from "../app";
import { isEnglish } from "./Header";

const showSureButton = signal(false);
export const isInDemoMode = signal(false);

export const loadExampleData = () => {
  appData.value = [
    {
      name: "Press de banca",
      tags: ["pecho", "fuerza"],
      records: [
        {
          date: new Date("2025-04-20T10:00:00Z"),
          name: "Press de banca",
          reps: 8,
          weight: 75,
          id: "1",
        },
        {
          date: new Date("2025-04-21T10:00:00Z"),
          name: "Press de banca",
          reps: 6,
          weight: 80,
          id: "2",
        },
        {
          date: new Date("2025-04-22T10:00:00Z"),
          name: "Press de banca",
          reps: 5,
          weight: 85,
          id: "3",
        },
        {
          date: new Date("2025-04-23T10:00:00Z"),
          name: "Press de banca",
          reps: 4,
          weight: 87.5,
          id: "4",
        },
      ],
      lastModified: new Date("2025-04-23T12:00:00Z"),
      maxWeight: 87.5,
      id: "a1",
    },
    {
      name: "Sentadillas",
      tags: ["piernas", "fuerza"],
      records: [
        {
          date: new Date("2025-04-20T09:00:00Z"),
          name: "Sentadillas",
          reps: 10,
          weight: 90,
          id: "5",
        },
        {
          date: new Date("2025-04-21T09:00:00Z"),
          name: "Sentadillas",
          reps: 8,
          weight: 100,
          id: "6",
        },
        {
          date: new Date("2025-04-22T09:00:00Z"),
          name: "Sentadillas",
          reps: 6,
          weight: 110,
          id: "7",
        },
        {
          date: new Date("2025-04-23T09:00:00Z"),
          name: "Sentadillas",
          reps: 4,
          weight: 115,
          id: "8",
        },
      ],
      lastModified: new Date("2025-04-23T10:30:00Z"),
      maxWeight: 115,
      id: "a2",
    },
    {
      name: "Dominadas lastradas",
      tags: ["espalda", "jalón"],
      records: [
        {
          date: new Date("2025-04-20T08:00:00Z"),
          name: "Dominadas lastradas",
          reps: 5,
          weight: 10,
          id: "9",
        },
        {
          date: new Date("2025-04-21T08:00:00Z"),
          name: "Dominadas lastradas",
          reps: 4,
          weight: 15,
          id: "10",
        },
        {
          date: new Date("2025-04-22T08:00:00Z"),
          name: "Dominadas lastradas",
          reps: 3,
          weight: 20,
          id: "11",
        },
        {
          date: new Date("2025-04-23T08:00:00Z"),
          name: "Dominadas lastradas",
          reps: 2,
          weight: 25,
          id: "12",
        },
      ],
      lastModified: new Date("2025-04-23T09:00:00Z"),
      maxWeight: 25,
      id: "a3",
    },
    {
      name: "Peso muerto",
      tags: ["espalda", "piernas", "fuerza"],
      records: [
        {
          date: new Date("2025-04-20T07:00:00Z"),
          name: "Peso muerto",
          reps: 5,
          weight: 120,
          id: "13",
        },
        {
          date: new Date("2025-04-21T07:00:00Z"),
          name: "Peso muerto",
          reps: 4,
          weight: 130,
          id: "14",
        },
        {
          date: new Date("2025-04-22T07:00:00Z"),
          name: "Peso muerto",
          reps: 3,
          weight: 140,
          id: "15",
        },
        {
          date: new Date("2025-04-23T07:00:00Z"),
          name: "Peso muerto",
          reps: 2,
          weight: 150,
          id: "16",
        },
      ],
      lastModified: new Date("2025-04-23T08:00:00Z"),
      maxWeight: 150,
      id: "a4",
    },
  ];
  changeScreen("Dashboard");
  isInDemoMode.value = true;
  showSureButton.value = false;
};
export const ButtonLoadExampleData = () => (
  <>
    <button onClick={() => (showSureButton.value = true)}>
      {isEnglish.value ? "Load example data" : "Cargar datos de ejemplo"}
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
              {isEnglish.value
                ? "Do you want to load example data?"
                : "Quiere cargar datos de ejemplo?"}
            </p>
            <button onClick={() => (showSureButton.value = false)}>X</button>
          </div>
          <p class="my-4">
            {isEnglish.value
              ? "This action will add example data to see the interface and delete all your previous data and it can't be undone."
              : "Esta accion añadira datos de ejemplo para ver la interfaz y borrara todos tus datos anteriores y no se puede deshacer."}
          </p>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => loadExampleData()}
          >
            {isEnglish.value ? "Load data" : "Cargar datos"}
          </button>
        </div>
      </div>
    )}
  </>
);
