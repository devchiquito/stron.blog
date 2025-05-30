import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Serie } from "../interfaces/Serie";
import { isEnglish } from "./Header";

interface Props {
  bestRecordsArray: Serie[];
}

export default function RecordsChart({ bestRecordsArray }: Props) {
  console.log({ bestRecordsArray });
  return (
    <div class={"mx-[-20px] "}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={bestRecordsArray}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* Eje X con fechas (de más antiguas a más recientes) */}
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
          />
          {/* Eje Y izquierdo para el peso */}
          <YAxis yAxisId="left" />
          {/* Eje Y derecho para las repeticiones */}
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(26.9% 0 0)",
              border: "none",
            }}
            labelFormatter={(tick) => new Date(tick).toLocaleDateString()}
          />
          <Legend />

          {/* Área de peso */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="weight"
            stroke="#38bdf8"
            fill="#38bdf8"
            fillOpacity={0.3}
            name={isEnglish.value ? "Weight" : "Peso"}
          />

          {/* Área de repeticiones */}
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="reps"
            stroke="oklch(84.1% 0.238 128.85)"
            fill="oklch(84.1% 0.238 128.85)"
            fillOpacity={0.3}
            name="Reps"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
