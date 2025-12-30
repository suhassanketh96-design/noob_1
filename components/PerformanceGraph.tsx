
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PerformanceGraphProps {
  score: number;
}

const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ score }) => {
  const data = [
    { name: 'Your Build', score: score },
    { name: 'High-End 2024', score: 95 },
    { name: 'Mid-Range 2024', score: 70 },
    { name: 'Entry-Level 2024', score: 45 },
  ];

  return (
    <div className="h-64 w-full bg-slate-900/50 p-4 rounded-xl border border-slate-800">
      <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">Performance Index</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#94a3b8" 
            fontSize={10} 
            width={80} 
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: '12px' }}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === 'Your Build' ? '#22d3ee' : '#334155'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceGraph;
