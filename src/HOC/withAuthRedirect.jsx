import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function mapStateToProps(state) {
  return { isAuth: state.auth.isAuth };
}

function withAuthRedirect(Component) {
  function ContainerComponent(props) {
    if (!props.isAuth) return <Navigate to="/login" />;

    return <Component {...props} />;
  }

  const connectedContainerComponent =
    connect(mapStateToProps)(ContainerComponent);

  return connectedContainerComponent;
}

export default withAuthRedirect;
