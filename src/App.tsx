import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect } from "react-redux";
import { setInitializedThunk } from "./redux/appReducer";
import Loader from "./components/common/Loader";
import { AppStateType } from "./redux/redux-store";
// import { UsersPage } from "./components/Users/UsersPage";

const MessagesContainer = React.lazy(() => import("./components/Messages/MessagesContainer"));
const UsersPage = React.lazy(() => import("./components/Users/UsersPage"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setInitialized: () => void;
};

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
  catchAllUnhandlenErrors = (event: { reason: string }) => {
    alert("Some error occured " + event.reason);
  };
  componentDidMount() {
    this.props.setInitialized();
    window.addEventListener("unhandledrejection", this.catchAllUnhandlenErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandlenErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Loader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <SidebarContainer />
        <main className="page-content">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="/" element={<Navigate to="profile" replace />} />
              <Route path="profile/:userId?" element={<ProfileContainer />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="messages/*" element={<MessagesContainer />} />
              <Route path="news" element={<News />} />
              <Route path="music" element={<Music />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<h1>404 Page not found</h1>} />
            </Routes>
          </Suspense>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state: AppStateType) {
  return {
    initialized: state.app.initialized,
  };
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
  setInitialized: setInitializedThunk,
})(App);
