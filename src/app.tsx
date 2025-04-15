import { effect, signal } from "@preact/signals";
import { Dashboard } from "./screens/Dashboard";
import { History } from "./screens/History";
import { Exercise } from "./interfaces/Exercise";
import { Settings } from "./screens/Settings";

const screen = signal("Dashboard");
const savedData = localStorage.getItem("myAppData");
const defaultData: Exercise[] = [];

export const appData = signal<Exercise[]>(
  savedData ? JSON.parse(savedData) : defaultData
);

// 👉 Guardar automáticamente cada vez que cambie
effect(() => {
  localStorage.setItem("myAppData", JSON.stringify(appData.value));
});

export function App() {
  return (
    <>
      <h1 class="text-3   xl font-bold underline">{screen}</h1>

      <div class={"flex justify-center p-5 pb-24"}>
        {screen.value === "Dashboard" ? (
          <Dashboard exercises={appData.value} />
        ) : screen.value === "History" ? (
          <History records={[]} />
        ) : (
          <Settings />
        )}
      </div>
      <div class="fixed bottom-0 left-0 right-0 flex w-full justify-around p-4 bg-zinc-900 text-white">
        <button
          onClick={() => {
            screen.value = "Dashboard";
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            screen.value = "History";
          }}
        >
          History
        </button>
        <button onClick={() => (screen.value = "Settings")}>Settings</button>
      </div>
    </>
  );
}
