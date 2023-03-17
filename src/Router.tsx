import { Suspense, lazy } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';

const ChartPage = lazy(() => import('@/pages/ChartPage'));

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary fallback={<div>Error...</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ChartPage />
          </Suspense>
        </ErrorBoundary>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
