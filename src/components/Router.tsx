import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import HowItWorksPage from '@/components/pages/HowItWorksPage';
import FindJobsPage from '@/components/pages/FindJobsPage';
import JobDetailsPage from '@/components/pages/JobDetailsPage';
import PostJobPage from '@/components/pages/PostJobPage';
import PricingPage from '@/components/pages/PricingPage';
import SafetyPage from '@/components/pages/SafetyPage';
import ContactPage from '@/components/pages/ContactPage';
import ProfilePage from '@/components/pages/ProfilePage';
import AdminPage from '@/components/pages/AdminPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "how-it-works",
        element: <HowItWorksPage />,
      },
      {
        path: "find-jobs",
        element: <FindJobsPage />,
      },
      {
        path: "job/:id",
        element: <JobDetailsPage />,
      },
      {
        path: "post-job",
        element: <PostJobPage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "safety",
        element: <SafetyPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
