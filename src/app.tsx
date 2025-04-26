import { effect, signal } from "@preact/signals";
import { Dashboard } from "./screens/Dashboard";
import { History } from "./screens/History";
import { Exercise } from "./interfaces/Exercise";
import { Settings } from "./screens/Settings";
import { ExerciseModal } from "./modals/ExerciseModal";
import { RecordModal } from "./modals/RecordModal";
import { Header } from "./components/Header";
import { BottomNavigationBar } from "./components/BottomNavigationBar";

const lastScreen = localStorage.getItem("lastScreen");
const screen = signal<string>(lastScreen ? lastScreen : "Dashboard");
effect(() => localStorage.setItem("lastScreen", screen.value));
export const changeScreen = (screenSelected: string) =>
  (screen.value = screenSelected);

const localStorageData = localStorage.getItem("myAppData");
export const appData = signal<Exercise[]>(
  localStorageData ? JSON.parse(localStorageData) : []
);
effect(() => {
  localStorage.setItem("myAppData", JSON.stringify(appData.value));
});

export const updateData = (newData: Exercise[]) => (appData.value = newData);

export function App() {
  return (
    <>
      <Header />
      <div class={"flex justify-center p-5 pb-24 "}>
        {screen.value === "Dashboard" ? (
          <Dashboard exercises={appData.value} />
        ) : screen.value === "History" ? (
          <History />
        ) : (
          <Settings />
        )}
      </div>
      <BottomNavigationBar changeScreen={changeScreen} screen={screen} />
      <ExerciseModal />
      <RecordModal />
    </>
  );
}
