import React, { useEffect, useState } from "react";

import "./Preview.scss";
import ButtonStandard from "@components/Button/ButtonStandard";
import Confirmation from "@components/Confirmation";
import Notification from "@components/Notification";
import { IEmployee } from "@models/IEmployee";
import { IWorkstation } from "@models/IWorkstation";
import ScoreboardStore from "@store/ScoreboardStore";
import { observer } from "mobx-react-lite";

const scoreboardStore = new ScoreboardStore();

type PreviewProps = {
  employee: IEmployee;
  workstation: IWorkstation;
};
const Preview: React.FC<PreviewProps> = ({ employee, workstation }) => {
  const [activeWindow, setActiveWindow] = useState<number>(0);
  const [isNotification, setIsNotification] = useState<boolean>(false);

  useEffect(() => {
    if (isNotification) {
      setTimeout(() => {
        setIsNotification(false);
      }, 3000);
    }
  }, [isNotification]);

  return (
    <div className="preview">
      {activeWindow === 0 && (
        <div className="body">
          <table>
            <tbody>
              <td>Рабочая станция</td>
              <tr>
                <th>ID Раб. станции</th>
                <th>{workstation.workstation_id}</th>
              </tr>
              <tr>
                <th>Название</th>
                <th>{workstation.workstation_name}</th>
              </tr>
              <td>Сотрудник</td>
              <tr>
                <th>ID сотрудника</th>
                <th>{employee.employee_id}</th>
              </tr>
              <tr>
                <th>Username</th>
                <th>{employee.username}</th>
              </tr>
              <tr>
                <th>Имя</th>
                <th>
                  {employee.first_name} {employee.second_name}
                </th>
              </tr>
            </tbody>
          </table>
          <div className="control">
            <ButtonStandard
              text={"Очистить очередь"}
              onClick={() => {
                setActiveWindow(1);
                setIsNotification(false);
              }}
            />
            <ButtonStandard
              text={"Очистить историю"}
              onClick={() => {
                setActiveWindow(2);
                setIsNotification(false);
              }}
            />
            <ButtonStandard
              text={"Обнулить счетчик"}
              onClick={() => {
                setActiveWindow(3);
                setIsNotification(false);
              }}
            />
          </div>

          <Notification text={"Выполнено"} isNotification={isNotification} />
        </div>
      )}
      {activeWindow === 1 && (
        <Confirmation
          text={"Вы уверены, что хотите ОЧИСТИТЬ ОЧЕРЕДЬ?"}
          yes={() => {
            scoreboardStore.clearQueue().then(() => {
              setActiveWindow(0);
              setIsNotification(true);
            });
          }}
          no={() => {
            setActiveWindow(0);
          }}
        />
      )}
      {activeWindow === 2 && (
        <Confirmation
          text={"Вы уверены, что хотите ОЧИСТИТЬ ИСТОРИЮ?"}
          yes={() => {
            scoreboardStore.clearLog().then(() => {
              setActiveWindow(0);
              setIsNotification(true);
            });
          }}
          no={() => {
            setActiveWindow(0);
          }}
        />
      )}
      {activeWindow === 3 && (
        <Confirmation
          text={"Вы уверены, что хотите ОЧИСТИТЬ ОЧЕРЕДЬ и ОБНУЛИТЬ СЧЕТЧИК?"}
          yes={() => {
            scoreboardStore.restartIdentity().then(() => {
              setActiveWindow(0);
              setIsNotification(true);
            });
          }}
          no={() => {
            setActiveWindow(0);
          }}
        />
      )}
    </div>
  );
};

export default observer(Preview);
