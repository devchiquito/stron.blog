import { signal } from "@preact/signals";
import { Dashboard } from "./screens/Dashboard";
import { History } from "./screens/History";
const screen = signal("Dashboard");

export function App() {
  return (
    <>
      <h1 class="text-3   xl font-bold underline">{screen}</h1>
      <div class={"flex justify-center p-5"}>
        {screen.value === "Dashboard" ? <Dashboard /> : <History />}
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
      </div>
    </>
  );
}
