import React from "react";
import LeftBar from "../../components/LeftBar";

const UserRoute = ({ children }) => {
  return (
    <div className="container-fluid row p-0">
      <div className="col-md-2">
        <LeftBar />
      </div>
      <div className="col-md-10">{children}</div>
    </div>
  );
};

export default UserRoute;
