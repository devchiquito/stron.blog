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
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={bestRecordsArray}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Area
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
          name="Peso (kg)"
        />

        <Area
          type="monotone"
          dataKey="reps"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.3}
          name="Repeticiones"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
