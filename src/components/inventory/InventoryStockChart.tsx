import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Dining Chair', stock: 150 },
  { name: 'Coffee Table', stock: 80 },
  { name: 'Bed Frame', stock: 45 },
  { name: 'Sofa Set', stock: 30 },
  { name: 'Bookshelf', stock: 65 },
  { name: 'Study Desk', stock: 90 },
];

export const InventoryStockChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="stock" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};