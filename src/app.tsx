import { effect, signal } from "@preact/signals";
import { Dashboard } from "./screens/Dashboard";
import { History } from "./screens/History";
import { Exercise } from "./interfaces/Exercise";
import { Settings } from "./screens/Settings";

const screen = signal<string>("Dashboard");

const localStorageData = localStorage.getItem("myAppData");
export const appData = signal<Exercise[]>(
  localStorageData ? JSON.parse(localStorageData) : []
);
effect(() => {
  localStorage.setItem("myAppData", JSON.stringify(appData.value));
});

export function App() {
  return (
    <>
      <header class="p-3 gap-2 border-b border-zinc-700 font-bold flex items-center">
        <svg
          class={"fill-lime-400 h-5 w-5"}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M10.81 20.38C10.2076 20.3793 9.62953 20.1423 9.2 19.72L4.2 14.72C3.98805 14.5099 3.81982 14.2599 3.70501 13.9844C3.5902 13.7089 3.53109 13.4134 3.53109 13.115C3.53109 12.8166 3.5902 12.5211 3.70501 12.2456C3.81982 11.9701 3.98805 11.7201 4.2 11.51L4.43 11.27C4.85868 10.8462 5.43718 10.6085 6.04 10.6085C6.64281 10.6085 7.22132 10.8462 7.65 11.27L12.65 16.27C12.8619 16.4801 13.0302 16.7301 13.145 17.0056C13.2598 17.2811 13.3189 17.5766 13.3189 17.875C13.3189 18.1734 13.2598 18.4689 13.145 18.7444C13.0302 19.0199 12.8619 19.2699 12.65 19.48L12.42 19.72C11.9905 20.1423 11.4124 20.3793 10.81 20.38ZM6.05 12.11C5.94986 12.1088 5.85049 12.1276 5.75774 12.1654C5.665 12.2032 5.58076 12.2591 5.51 12.33L5.27 12.57C5.19834 12.6415 5.14149 12.7265 5.1027 12.82C5.06391 12.9135 5.04394 13.0137 5.04394 13.115C5.04394 13.2162 5.06391 13.3165 5.1027 13.41C5.14149 13.5035 5.19834 13.5885 5.27 13.66L10.27 18.66C10.4161 18.8053 10.6139 18.8869 10.82 18.8869C11.0261 18.8869 11.2238 18.8053 11.37 18.66L11.6 18.42C11.6734 18.3486 11.7317 18.263 11.7712 18.1685C11.8107 18.074 11.8307 17.9724 11.83 17.87C11.8305 17.7691 11.8104 17.6691 11.7708 17.5762C11.7313 17.4833 11.6731 17.3996 11.6 17.33L6.6 12.33C6.52739 12.2588 6.4414 12.2027 6.347 12.165C6.2526 12.1272 6.15166 12.1085 6.05 12.11Z"
              fill="oklch(84.1% 0.238 128.85)"
            />{" "}
            <path
              d="M17.92 13.37C17.3164 13.3656 16.7385 13.1251 16.31 12.7L11.31 7.7C10.8838 7.2726 10.6444 6.69362 10.6444 6.09C10.6444 5.48639 10.8838 4.9074 11.31 4.48L11.55 4.24C11.977 3.81681 12.5538 3.57938 13.155 3.57938C13.7562 3.57938 14.333 3.81681 14.76 4.24L19.76 9.24C20.1832 9.66699 20.4206 10.2438 20.4206 10.845C20.4206 11.4462 20.1832 12.023 19.76 12.45L19.52 12.69C19.0956 13.1164 18.5215 13.3603 17.92 13.37ZM13.16 5.09C13.059 5.08888 12.9588 5.10875 12.8659 5.14834C12.7729 5.18793 12.6892 5.24638 12.62 5.32L12.38 5.55C12.2347 5.69615 12.1531 5.89389 12.1531 6.1C12.1531 6.30612 12.2347 6.50385 12.38 6.65L17.38 11.65C17.5261 11.7953 17.7239 11.8769 17.93 11.8769C18.1361 11.8769 18.3338 11.7953 18.48 11.65L18.71 11.41C18.7831 11.3404 18.8413 11.2566 18.8808 11.1638C18.9204 11.0709 18.9405 10.9709 18.94 10.87C18.9407 10.7676 18.9207 10.666 18.8812 10.5715C18.8417 10.477 18.7834 10.3914 18.71 10.32L13.71 5.32C13.6382 5.24703 13.5526 5.18911 13.4582 5.14961C13.3637 5.11012 13.2624 5.08986 13.16 5.09Z"
              fill="oklch(84.1% 0.238 128.85)"
            />{" "}
            <path
              d="M19.55 10.21C18.9476 10.2093 18.3695 9.97235 17.94 9.55L14.53 6.13C14.3181 5.91989 14.1498 5.66988 14.035 5.39441C13.9202 5.11893 13.8611 4.82344 13.8611 4.525C13.8611 4.22656 13.9202 3.93107 14.035 3.6556C14.1498 3.38012 14.3181 3.13011 14.53 2.92L14.76 2.68C15.1874 2.25376 15.7664 2.0144 16.37 2.0144C16.9736 2.0144 17.5526 2.25376 17.98 2.68L21.4 6.09C21.8238 6.51868 22.0615 7.09719 22.0615 7.7C22.0615 8.30282 21.8238 8.88132 21.4 9.31L21.16 9.55C20.7305 9.97235 20.1524 10.2093 19.55 10.21ZM16.37 3.51C16.1639 3.51294 15.9669 3.59534 15.82 3.74L15.59 4C15.5183 4.07152 15.4615 4.15647 15.4227 4.24999C15.3839 4.34351 15.3639 4.44376 15.3639 4.545C15.3639 4.64624 15.3839 4.74649 15.4227 4.84001C15.4615 4.93353 15.5183 5.01848 15.59 5.09L19 8.49C19.1462 8.63534 19.3439 8.71692 19.55 8.71692C19.7561 8.71692 19.9538 8.63534 20.1 8.49L20.33 8.25C20.4032 8.17831 20.4613 8.09273 20.501 7.99829C20.5407 7.90385 20.5611 7.80244 20.5611 7.7C20.5611 7.59756 20.5407 7.49615 20.501 7.40171C20.4613 7.30727 20.4032 7.22169 20.33 7.15L16.92 3.74C16.7744 3.59353 16.5766 3.51082 16.37 3.51Z"
              fill="oklch(84.1% 0.238 128.85)"
            />{" "}
            <path
              d="M7.63 22C7.32648 22.0025 7.02561 21.9435 6.74549 21.8266C6.46536 21.7098 6.21178 21.5374 6 21.32L2.61 17.91C2.39775 17.699 2.2293 17.4482 2.11436 17.1719C1.99942 16.8956 1.94025 16.5993 1.94025 16.3C1.94025 16.0007 1.99942 15.7044 2.11436 15.4281C2.2293 15.1518 2.39775 14.901 2.61 14.69L2.84 14.45C3.26868 14.0262 3.84718 13.7885 4.45 13.7885C5.05281 13.7885 5.63131 14.0262 6.06 14.45L9.47 17.87C9.68194 18.0801 9.85018 18.3301 9.96498 18.6056C10.0798 18.8811 10.1389 19.1766 10.1389 19.475C10.1389 19.7734 10.0798 20.0689 9.96498 20.3444C9.85018 20.6199 9.68194 20.8699 9.47 21.08L9.24 21.32C9.03022 21.5346 8.77981 21.7052 8.50339 21.8219C8.22697 21.9387 7.93006 21.9992 7.63 22ZM4.45 15.3C4.34834 15.2985 4.24739 15.3172 4.15299 15.355C4.05859 15.3928 3.97261 15.4488 3.9 15.52L3.67 15.76C3.59683 15.8317 3.53869 15.9173 3.49901 16.0117C3.45933 16.1062 3.43888 16.2076 3.43888 16.31C3.43888 16.4124 3.45933 16.5139 3.49901 16.6083C3.53869 16.7027 3.59683 16.7883 3.67 16.86L7.08 20.27C7.15152 20.3417 7.23647 20.3985 7.32999 20.4373C7.4235 20.4761 7.52375 20.4961 7.625 20.4961C7.72624 20.4961 7.82649 20.4761 7.92001 20.4373C8.01353 20.3985 8.09848 20.3417 8.17 20.27L8.41 20C8.48166 19.9285 8.53851 19.8435 8.5773 19.75C8.61609 19.6565 8.63605 19.5562 8.63605 19.455C8.63605 19.3538 8.61609 19.2535 8.5773 19.16C8.53851 19.0665 8.48166 18.9815 8.41 18.91L5 15.51C4.92738 15.4388 4.8414 15.3828 4.747 15.345C4.6526 15.3072 4.55166 15.2885 4.45 15.29V15.3Z"
              fill="oklch(84.1% 0.238 128.85)"
            />{" "}
            <path
              d="M10.78 16.2C10.6812 16.2022 10.583 16.1838 10.4918 16.1459C10.4005 16.108 10.3182 16.0515 10.25 15.98L8 13.77C7.92924 13.7011 7.87301 13.6186 7.83461 13.5276C7.79621 13.4366 7.77643 13.3388 7.77643 13.24C7.77643 13.1412 7.79621 13.0434 7.83461 12.9524C7.87301 12.8614 7.92924 12.7789 8 12.71L12.71 8C12.7782 7.92846 12.8605 7.87195 12.9518 7.83407C13.043 7.79618 13.1412 7.77777 13.24 7.78C13.3388 7.77777 13.437 7.79618 13.5282 7.83407C13.6195 7.87195 13.7018 7.92846 13.77 8L16 10.25C16.0708 10.3189 16.127 10.4014 16.1654 10.4924C16.2038 10.5834 16.2236 10.6812 16.2236 10.78C16.2236 10.8788 16.2038 10.9766 16.1654 11.0676C16.127 11.1586 16.0708 11.2411 16 11.31L11.31 16C11.2401 16.0679 11.157 16.1207 11.0658 16.1551C10.9746 16.1896 10.8773 16.2048 10.78 16.2ZM9.63 13.2L10.78 14.35L14.39 10.74L13.24 9.63L9.63 13.2Z"
              fill="oklch(84.1% 0.238 128.85)"
            />{" "}
          </g>
        </svg>
        STRON.BLOG
      </header>
      <p class="text-3  text-center p-5 xl font-bold underline">{screen}</p>

      <div class={"flex justify-center p-5 pb-24 max-w-xl mx-auto"}>
        {screen.value === "Dashboard" ? (
          <Dashboard exercises={appData.value} />
        ) : screen.value === "History" ? (
          <History />
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
