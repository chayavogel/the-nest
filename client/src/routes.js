import App from "./Pages/App"
import ErrorPage from "./Pages/Error/ErrorPage";
import HomePage from "./Pages/Home/HomePage"
import ToyPage from "./Pages/ToyCards/ToyPage";
import ToyDetailsPage from "./Pages/ToyDetails/ToyDetailsPage"
import ToyFormPage from "./Pages/ToySubmission/ToyFormPage";
import UserDetailsPage from "./Pages/UserDetails/UserDetailsPage";
import AccountPage from "./Pages/Account/AccountPage";
import AboutPage from "./About/AboutPage";

const routes = [
  {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
          {
            path: "/",
            element: <HomePage />,
            errorElement: <ErrorPage />
          },
          {
            path: "/toys",
            element: <ToyPage />,
            errorElement: <ErrorPage />
          },
          {
            path: "/about",
            element: <AboutPage />,
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
          },
          {
            path: "/account",
            element: <AccountPage />,
            errorElement: <ErrorPage />
          }
      ]
  }
];

export default routes;