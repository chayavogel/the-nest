import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h3>How'd you end up here?!</h3>
        <p>It looks like this page doesn't exist.</p>
        <p><em>Your detailed error: {error.statusText}</em></p>
        <button className="btn btn-primary" onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default ErrorPage;
