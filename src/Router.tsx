import React from 'react';
import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Message } from './pages/style';

const ChartPage = React.lazy(() => import('@/pages/ChartPage'));

function ErrorFallback({ error }: any) {
  return (
    <Message>
      <h1>Something went wrong:</h1>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </Message>
  );
}

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Message>Loading...</Message>}>
            <ChartPage />
          </Suspense>
        </ErrorBoundary>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
