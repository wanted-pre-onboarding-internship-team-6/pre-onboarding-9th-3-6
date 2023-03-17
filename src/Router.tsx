import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/components';
import { ChartPage } from '@/pages';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout>
          <ChartPage />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
