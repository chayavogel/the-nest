// Does the route for login make sense?
// add a way to logout

import App from "./Pages/App"
import ErrorPage from "./Pages/Error/ErrorPage";
import HomePage from "./Pages/Home/HomePage"
import ToyPage from "./Pages/ToyCards/ToyPage";
import LoginPage from "./Pages/Login/LoginPage";
import ToyDetailsPage from "./Pages/ToyDetails/ToyDetailsPage"
import ToyFormPage from "./Pages/ToySubmission/ToyFormPage";
import UserDetailsPage from "./Pages/UserDetails/UserDetailsPage";

const routes = [
  {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
          {
            path: "/",
            element: <LoginPage />,
            errorElement: <ErrorPage />
          },
          {
            path: "/home",
            element: <HomePage />,
            errorElement: <ErrorPage />
          },
          {
            path: "/toys",
            element: <ToyPage />,
            errorElement: <ErrorPage />
          },
          {
            path: "/toy_details/:id",
            element: <ToyDetailsPage />,
            errorElement: <ErrorPage />
          },
          {
            path: "/toy_form",
            element: <ToyFormPage />,
            errorElement: <ErrorPage />
          },
          {
            path: "/user_details/:id",
            element: <UserDetailsPage />,
            errorElement: <ErrorPage />
          }
      ]
  }
];

export default routes;