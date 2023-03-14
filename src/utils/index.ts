import { DataProps } from '@/types';

export const API_URL =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/19736c70-c41c-4a4a-b45f-b866eebab626/mock_data_example-flexsys.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230314T104157Z&X-Amz-Expires=86400&X-Amz-Signature=eea8a447beb48317b687d32274038fe61e119eb54d5c111edb62809357b8d274&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22mock_data_example-flexsys.json%22&x-id=GetObject';

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
    tooltip: {
      callbacks: {},
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export const createAreaInfo = (datas: [string, DataProps][]) => {
  return datas.map((data: [string, DataProps]) => {
    return {
      id: data[1].id,
      area: data[1].value_area,
      time: data[0].split(' ')[1],
    };
  });
};

export const createBarInfo = (datas: [string, DataProps][]) => {
  return datas.map((data: [string, DataProps]) => {
    return {
      id: data[1].id,
      bar: data[1].value_bar,
      time: data[0].split(' ')[1],
    };
  });
};

export const createLabelInfo = (datas: [string, DataProps][]) => {
  return datas.map((data: [string, DataProps]) => {
    const idGroup = data[1].id;
    const timeGroup = data[0].split(' ')[1];

    return [idGroup, timeGroup];
  });
};
