import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/home';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}
