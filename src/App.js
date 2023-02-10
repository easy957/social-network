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

const MessagesContainer = React.lazy(() =>
  import("./components/Messages/MessagesContainer")
);
const UsersContainer = React.lazy(() =>
  import("./components/Users/UsersContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const Login = React.lazy(() => import("./components/Login/Login"));

class App extends React.Component {
  componentDidMount() {
    this.props.setInitialized();
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
              <Route path="users" element={<UsersContainer />} />
              <Route path="messages/*" element={<MessagesContainer />} />
              <Route path="news" element={<News />} />
              <Route path="music" element={<Music />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialized: state.app.initialized,
  };
}

export default connect(mapStateToProps, {
  setInitialized: setInitializedThunk,
})(App);
