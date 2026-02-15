import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Analysis } from "./pages/Analysis";
import { JobMatches } from "./pages/JobMatches";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/analysis",
    Component: Analysis,
  },
  {
    path: "/jobs",
    Component: JobMatches,
  },
]);
