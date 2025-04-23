import { Signal } from "@preact/signals";
import { isEnglish } from "./Header";

export const BottomNavigationBar = ({
  changeScreen,
  screen,
}: {
  changeScreen: (screen: string) => void;
  screen: Signal<string>;
}) => (
  <div class="fixed bottom-0 left-0 right-0 flex w-full max-w-xl mx-auto justify-around p-4 bg-neutral-900 text-white rounded-t-4xl">
    <button
      onClick={() => {
        changeScreen("Dashboard");
      }}
      class={screen.value === "Dashboard" ? "text-lime-400" : ""}
    >
      {isEnglish.value ? "Dashboard" : "Tablero"}
    </button>
    <button
      onClick={() => changeScreen("History")}
      class={screen.value === "History" ? "text-lime-400" : ""}
    >
      {isEnglish.value ? "History" : "Historial"}
    </button>
    <button
      onClick={() => changeScreen("Settings")}
      class={screen.value === "Settings" ? "text-lime-400" : ""}
    >
      {isEnglish.value ? "Settings" : "Ajustes"}
    </button>
  </div>
);
