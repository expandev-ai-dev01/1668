import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { AppLayout } from '@/pages/layouts/AppLayout';

const HomePage = lazy(() => import('@/pages/Home'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: (
      <ErrorBoundary>
        <div>Something went wrong</div>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
