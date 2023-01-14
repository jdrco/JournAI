import React from 'react';
import loadable from '@loadable/component'
const Chart = loadable(() => import('react-apexcharts'), { ssr: false });

export default function EntryChart({config}) {
  return (
    <div className="h-[400px] w-[400px]">
      <Chart
          options={config.options}
          series={config.series}
          type="radialBar"
          width="500"
        />
    </div>
  );
}
