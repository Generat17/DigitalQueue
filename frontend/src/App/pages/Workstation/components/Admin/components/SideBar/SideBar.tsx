import React, { useState } from "react";

import "./SideBar.scss";
import EmailSVG from "@styles/icons/EmailSVG";
import EmployeeSVG from "@styles/icons/EmployeeSVG";
import HomeSVG from "@styles/icons/HomeSVG";
import LeftSVG from "@styles/icons/LeftSVG";
import LogSVG from "@styles/icons/LogSVG";
import QueueSVG from "@styles/icons/QueueSVG";
import ResponsibilitySVG from "@styles/icons/ResponsibilitySVG";
import RightSVG from "@styles/icons/RightSVG";
import WorkstationSVG from "@styles/icons/WorkstationSVG";

type SideBarProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const SideBar: React.FC<SideBarProps> = ({ value, setValue }) => {
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <>
      {toggle ? (
        <div className="menu">
          <div
            className="toggle"
            onClick={() => {
              setToggle(false);
            }}
          >
            <LeftSVG size={"4vh"} />
          </div>
          <div
            className={`menu-button ${
              value === 0 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(0)}
          >
            <HomeSVG size={"3vh"} />
            Главная
          </div>
          <div
            className={`menu-button ${
              value === 1 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(1)}
          >
            <EmployeeSVG size={"3vh"} />
            Сотрудники
          </div>
          <div
            className={`menu-button ${
              value === 2 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(2)}
          >
            <WorkstationSVG size={"3vh"} />
            Рабочие станции
          </div>
          <div
            className={`menu-button ${
              value === 3 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(3)}
          >
            <ResponsibilitySVG size={"3vh"} />
            Услуги
          </div>
          <div
            className={`menu-button ${
              value === 4 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(4)}
          >
            <LogSVG size={"3vh"} />
            Отчеты
          </div>
          <div
            className={`menu-button ${
              value === 5 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(5)}
          >
            <EmailSVG size={"3vh"} />
            Уведомления
          </div>
          <div
            className={`menu-button ${
              value === 6 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(6)}
          >
            <QueueSVG size={"3vh"} />
            Текущее состояние
          </div>
        </div>
      ) : (
        <div className="menu">
          <div
            className="toggle"
            onClick={() => {
              setToggle(true);
            }}
          >
            <RightSVG size={"4vh"} />
          </div>
          <div
            className={`menu-short-button ${
              value === 0 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(0)}
          >
            <HomeSVG size={"3vh"} />
          </div>
          <div
            className={`menu-short-button ${
              value === 1 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(1)}
          >
            <EmployeeSVG size={"3vh"} />
          </div>
          <div
            className={`menu-short-button ${
              value === 2 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(2)}
          >
            <WorkstationSVG size={"3vh"} />
          </div>
          <div
            className={`menu-short-button ${
              value === 3 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(3)}
          >
            <ResponsibilitySVG size={"3vh"} />
          </div>
          <div
            className={`menu-short-button ${
              value === 4 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(4)}
          >
            <LogSVG size={"3vh"} />
          </div>
          <div
            className={`workstation-admin-content-menu-button ${
              value === 5 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(5)}
          >
            <EmailSVG size={"3vh"} />
          </div>
          <div
            className={`menu-short-button ${
              value === 6 ? "selectButton" : "defaultButton"
            }`}
            onClick={() => setValue(6)}
          >
            <QueueSVG size={"3vh"} />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
