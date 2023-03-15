import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ChartPage } from '@/pages';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ChartPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
