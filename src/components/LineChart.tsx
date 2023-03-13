import { Line } from 'react-chartjs-2';

function LineChart({ chartData }: any) {
  return (
    <div className="chart-container" style={{ margin: '200px' }}>
      <h2 style={{ textAlign: 'center' }}>Area 차트</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'test',
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
export default LineChart;
