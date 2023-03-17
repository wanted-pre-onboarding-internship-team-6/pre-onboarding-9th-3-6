import { ReactNode, Suspense } from 'react';

import ErrorBoundary from './ErrorBoundary';

interface Props {
  error: ReactNode;
  loading: ReactNode;
  children: ReactNode;
}

export default function AsyncBoundary({ error, loading, children }: Props) {
  return (
    <ErrorBoundary fallback={error}>
      <Suspense fallback={loading}>{children}</Suspense>
    </ErrorBoundary>
  );
}
