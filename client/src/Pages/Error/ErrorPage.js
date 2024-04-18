import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <p>Looks like this page doesn't exist.</p>
        <p><em>Error: {error.statusText}</em></p>
        <button className="btn btn-primary" onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default ErrorPage;
