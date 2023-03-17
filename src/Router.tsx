import { Suspense } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ChartPage } from '@/pages';

import { ErrorBoundary } from './components';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <ErrorBoundary>
            <Suspense fallback={<>Loading 중</>}>
              <ChartPage />
            </Suspense>
          </ErrorBoundary>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
