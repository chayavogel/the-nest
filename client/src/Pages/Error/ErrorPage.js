// get errors from backend. i don't want it display after failed login or logout
// should i add this? window.history.back();

import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
    <p>Whoops! Something went wrong!</p>
    <p>{error.statusText}</p>
    <button onClick={() => window.history.back()}>Go Back</button>
    </>
  );
};

export default ErrorPage;