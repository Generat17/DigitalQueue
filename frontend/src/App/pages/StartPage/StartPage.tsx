import React, { useEffect, useState } from "react";

import ButtonStandard from "@components/Button/ButtonStandard";
import ButtonStandardPressed from "@components/Button/ButtonStandardPressed";
import HeaderStandard from "@components/Header/HeaderStandard";
import TextHeader from "@components/Text/TextHeader";
import EmployeeStore from "@store/EmployeeStore";
import WorkstationStore from "@store/WorkstationStore/WorkstationStore";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./StartPage.scss";

// Создаем объект mobX store
const workstationStore = new WorkstationStore();
const employeeStore = new EmployeeStore();

const StartPage: React.FC<any> = () => {
  const [activeWindow, setActiveWindow] = useState<number>(0);

  useEffect(() => {
    workstationStore.getWorkstationList().then();
    employeeStore.getEmployeeList().then();
  }, []);

  return (
    <div className="start-page" key="start-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Выбор интерфейса</title>
      </Helmet>
      <HeaderStandard />
      <div className="start-page-content" key="start-page-content">
        <TextHeader text={"Меню выбора интерфейса"} />
        {activeWindow === 0 && (
          <>
            <div>
              <Link to={`/scoreboard`} key="scoreboard">
                <ButtonStandard text={"Информационное табло"} />
              </Link>
            </div>

            <div>
              <Link to={`/reception`} key="reception">
                <ButtonStandard text={"Регистрационный терминал"} />
              </Link>
            </div>

            <div>
              <ButtonStandard
                text={"Авторизация сотрудника"}
                onClick={() => {
                  setActiveWindow(1);
                }}
              />
            </div>

            <div>
              <ButtonStandard
                text={"Оценка качества обслуживания"}
                onClick={() => {
                  setActiveWindow(2);
                }}
              />
            </div>
          </>
        )}
        {activeWindow === 1 && (
          <>
            <div>
              <ButtonStandard
                text={"В главное меню"}
                onClick={() => {
                  setActiveWindow(0);
                }}
              />
            </div>
            <div>
              {workstationStore.list
                .sort(function (a, b) {
                  return a.workstationId - b.workstationId;
                })
                .map((it) =>
                  it.isBusy ? (
                    <Link
                      to={`/workstation/${it.workstationId}`}
                      key={it.workstationId}
                    >
                      <ButtonStandardPressed
                        text={it.workstationName}
                        help={
                          employeeStore.list.find(
                            (el) => el.employeeId === it.employeeId
                          )?.username
                        }
                      />
                    </Link>
                  ) : (
                    <Link
                      to={`/workstation/${it.workstationId}`}
                      key={it.workstationId}
                    >
                      <ButtonStandard text={it.workstationName} />
                    </Link>
                  )
                )}
            </div>
          </>
        )}
        {activeWindow === 2 && (
          <>
            <div>
              <ButtonStandard
                text={"В главное меню"}
                onClick={() => {
                  setActiveWindow(0);
                }}
              />
            </div>
            <div>
              {workstationStore.list
                .sort(function (a, b) {
                  return a.workstationId - b.workstationId;
                })
                .map((it) => (
                  <Link
                    to={`/quality/${it.workstationId}`}
                    key={it.workstationId}
                  >
                    <ButtonStandard text={it.workstationName} />
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(StartPage);
