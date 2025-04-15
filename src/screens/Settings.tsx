import { signal } from "@preact/signals";

const showSureButton = signal(false);
export function Settings() {
  return (
    <>
      <div>
        {" "}
        <button onClick={() => (showSureButton.value = true)}>
          Delete all data
        </button>
      </div>
      {showSureButton.value && (
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("myAppData");
              window.location.reload();
            }}
          >
            Sure?
          </button>
        </div>
      )}
    </>
  );
}
