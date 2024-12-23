import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';

const data = [
  { x: 'Mon', y: '1', z: 30 },
  { x: 'Tue', y: '2', z: 45 },
  { x: 'Wed', y: '3', z: 20 },
  { x: 'Thu', y: '4', z: 60 },
  { x: 'Fri', y: '1', z: 35 },
  { x: 'Mon', y: '2', z: 25 },
  { x: 'Tue', y: '3', z: 50 },
  { x: 'Wed', y: '4', z: 40 },
];

const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const StockoutHeatmap = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="y" type="category" allowDuplicatedCategory={false} />
        <ZAxis dataKey="z" range={[100, 500]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};