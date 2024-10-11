import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChartIcon } from 'lucide-react';

interface LinearChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  title: string;
  dataKey: string;
}

const LinearChart: React.FC<LinearChartProps> = ({ data, title, dataKey }) => {
  // Função para formatar os valores do eixo Y
  const formatYAxis = (tickItem: number) => {
    if (tickItem >= 1000000) {
      return `${(tickItem / 1000000).toFixed(1)}M`;
    } else if (tickItem >= 1000) {
      return `${(tickItem / 1000).toFixed(1)}K`;
    }
    return tickItem.toString();
  };
  return (
    <section className='flex flex-col gap-2 mt-8'>
      <Card className='w-full md:max-w-[600px]'>
        <CardHeader>
          <div className='flex items-center justify-center'>
            <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
              {title}
            </CardTitle>
            <LineChartIcon className='ml-auto w-4 h-4' />
          </div>
        </CardHeader>
        <CardContent className='flex items-center justify-between'>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis dataKey="ano" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip />
              <Legend />
              <Line type="natural" dataKey={dataKey} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
};

export default LinearChart;

