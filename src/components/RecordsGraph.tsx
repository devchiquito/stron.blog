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
import { Record } from "../interfaces/Record";

interface Props {
  bestRecordsArray: Record[];
}

export default function RecordsChart({ bestRecordsArray }: Props) {
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
          <Tooltip />
          <Legend />

          {/* Área de peso */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            name="Weight (kg)"
          />

          {/* Área de repeticiones */}
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="reps"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.3}
            name="Repetitions"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
