import React, { useState } from "react";

import "./Admin.scss";
import HeaderAuth from "@components/Header/HeaderAuth";
import { IEmployee } from "@models/IEmployee";
import { IWorkstation } from "@models/IWorkstation";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";

import Employees from "./components/Employees";
import Log from "./components/Log";
import Notifications from "./components/Notifications";
import Queue from "./components/Online";
import Preview from "./components/Preview";
import Responsibilities from "./components/Responsibilities";
import SideBar from "./components/SideBar/SideBar";
import Workstations from "./components/Workstations";

type AdminProps = {
  employee: IEmployee;
  workstation: IWorkstation;
  onClickButtonLogout: () => void;
};

const Admin: React.FC<AdminProps> = ({
  employee,
  workstation,
  onClickButtonLogout,
}) => {
  const [button, setButton] = useState<number>(0);

  return (
    <div className="admin">
      <Helmet>
        <meta charSet="utf-8" />
        <title>ЛК администратора</title>
      </Helmet>
      <HeaderAuth
        text={employee.first_name + " " + employee.second_name}
        onClick={onClickButtonLogout}
      />

      <div className="content">
        <SideBar value={button} setValue={setButton} />

        {button === 0 && (
          <Preview employee={employee} workstation={workstation} />
        )}
        {button === 1 && <Employees />}
        {button === 2 && <Workstations />}
        {button === 3 && <Responsibilities />}
        {button === 4 && <Log />}
        {button === 5 && <Notifications />}
        {button === 6 && <Queue />}
      </div>
    </div>
  );
};

export default observer(Admin);
