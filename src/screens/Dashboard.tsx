import { Exercise } from "../interfaces/Exercise";

const exercises: Exercise[] = [
  {
    name: "Push-up",
    tags: ["Strength", "Upper body"],
    records: [],
    lastModified: new Date(),
  },
  {
    name: "Squat",
    tags: ["Strength", "Lower body"],
    records: [],
    lastModified: new Date(),
  },
  {
    name: "Plank",
    tags: ["Core", "Endurance"],
    records: [],
    lastModified: new Date(),
  },
];

export function Dashboard() {
  return (
    <div className="space-y-4 ">
      {exercises.map((exercise, index) => (
        <button key={index} className="p-4 bg-white shadow rounded-lg w-full">
          <h2 className="text-xl font-bold">{exercise.name}</h2>
          <div className="mt-2 flex flex-wrap space-x-2">
            {exercise.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
