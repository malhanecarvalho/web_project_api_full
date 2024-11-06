import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component,  ...props}) {
  return (
    <Route
    {...props}
    render={(rest) =>
      props.loggedIn ? <Component {...rest}/> : <Redirect to="/login" />} 
    />    
  );
}

export default ProtectedRoute;
