'use client';

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts';
import type { ChartData } from '@/types/dashboard';

interface StatsChartProps {
  data: ChartData[];
  title?: string;
}

// Custom label component to show value inside the bar
const CustomLabel = React.memo((props: any) => {
  const { x, y, width, height, value } = props;
  
  const formattedValue = useMemo(() => {
    return new Intl.NumberFormat('fa-IR').format(value);
  }, [value]);
  
  // Only show label if bar is tall enough
  if (!height || height < 20) return null;
  
  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={12}
      fontWeight="bold"
    >
      {formattedValue}
    </text>
  );
});

CustomLabel.displayName = 'CustomLabel';

export const StatsChart: React.FC<StatsChartProps> = ({ data, title }) => {
  const memoizedData = useMemo(() => data, [data]);
  
  return (
    <ResponsiveContainer width="100%" height={200} className="sm:h-[240px] md:h-[280px]">
      <BarChart data={memoizedData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive={false}>
          {memoizedData.map((entry, index) => (
            <Cell key={`cell-${index}-${entry.value}`} fill={entry.color} />
          ))}
          <LabelList content={<CustomLabel />} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

interface LegendItemProps {
  color: string;
  label: string;
  value: string | number;
}

export const ChartLegend: React.FC<{ items: LegendItemProps[] }> = ({ items }) => {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-600">
              {item.label}
            </span>
          </div>
          <span className="text-sm font-bold text-gray-800">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

