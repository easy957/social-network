import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";

function mapStateToProps(state: AppStateType) {
  return { isAuth: state.auth.isAuth };
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

function withAuthRedirect<WCP extends MapStatePropsType>(Component: React.ComponentType<WCP>) {
  function ContainerComponent(props: MapStatePropsType) {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Navigate to="/login" />;

    return <Component {...(restProps as WCP)} />;
  }

  return connect<MapStatePropsType, {}, WCP, AppStateType>(mapStateToProps)(ContainerComponent);
}

export default withAuthRedirect;
