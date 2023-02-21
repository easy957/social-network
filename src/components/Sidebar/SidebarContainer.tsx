import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: AppStateType) => {
  return {
    state: state.sidebar,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const SidebarContainer = connect<MapStatePropsType, {}, {}, AppStateType>(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default SidebarContainer;
