/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/appLayout";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import JobListing from "./pages/JobListing";
import MyJobs from "./pages/MyJobs";
import PostJob from "./pages/PostJob";
import SavedJobs from "./pages/SavedJobs";
import Job from "./pages/Job";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <Onboarding />,
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <JobListing />
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <Job />{" "}
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <MyJobs />{" "}
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <PostJob />{" "}
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <ErrorBoundary>
              <SavedJobs />{" "}
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <ErrorBoundary>
        <NotFound />
      </ErrorBoundary>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
