// /Users/chayavogel/Documents/Flatiron/phase-5/the-nest/client/src/routes.js

import App from "./components/App"
import HomePage from "./components/Pages/HomePage";
import ToyPage from "./components/Pages/ToyPage";
import LoginSignup from "./components/Pages/LoginSignup";

const routes = [
  {
      path: "/",
      element: <App />,
      // errorElement: <ErrorPage />,
      children: [
          {
              path: "/",
              element: <HomePage />,
              // errorElement: <ErrorPage />
          },
          {
            path: "/toys",
            element: <ToyPage />,
            // errorElement: <ErrorPage />
          },
          {
            path: "/login_signup",
            element: <LoginSignup />,
            // errorElement: <ErrorPage />
          },
      ]
  }
];

export default routes;