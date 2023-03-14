import { Chart } from 'react-chartjs-2';

function AllChart({ chartData }: any) {
  const { options } = chartData;

  return (
    <div className="chart-container" style={{ margin: '200px' }}>
      <h2 style={{ textAlign: 'center' }}>ALL CHART</h2>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
}
export default AllChart;
