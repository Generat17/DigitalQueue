import React from "react";

import "./Operator.scss";
import ButtonStandard from "@components/Button/ButtonStandard";
import HeaderAuth from "@components/Header/HeaderAuth";
import InfoPanel from "@components/InfoPanel";
import { IClient } from "@models/IClient";
import { IEmployee } from "@models/IEmployee";
import { IWorkstation } from "@models/IWorkstation";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";

type OperatorProps = {
  employee: IEmployee;
  workstation: IWorkstation;
  onClickButtonLogout: () => void;
  getClient: () => void;
  confirmClient: () => void;
  notCome: () => void;
  endClient: () => void;
  client: IClient;
};

const Operator: React.FC<OperatorProps> = ({
  employee,
  workstation,
  onClickButtonLogout,
  getClient,
  confirmClient,
  notCome,
  endClient,
  client,
}) => {
  return (
    <div className="operator">
      <Helmet>
        <meta charSet="utf-8" />
        <title>ЛК оператора</title>
      </Helmet>
      <InfoPanel text={"Личный кабинет оператора"} />
      <HeaderAuth
        text={employee.first_name + " " + employee.second_name}
        onClick={onClickButtonLogout}
      />
      <div className="content">
        <table>
          <tbody>
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
              <th>{employee.first_name}</th>
            </tr>
            <tr>
              <th>Фамилия</th>
              <th>{employee.second_name}</th>
            </tr>
            <tr>
              <th>Статус</th>
              <th>
                {employee.status === 1
                  ? "Свободен"
                  : employee.status === 2
                  ? "Ожидание клиента"
                  : "Работа с клиентом"}
              </th>
            </tr>
            <tr>
              <th>ID рабочей станции</th>
              <th>{workstation.workstation_id}</th>
            </tr>
            <tr>
              <th>Название рабочей станции</th>
              <th>{workstation.workstation_name}</th>
            </tr>
          </tbody>
        </table>
        <h2>Текущий клиент:</h2>
        {client.number_ticket === -1 ? (
          <h3>В данный момент клиентов нет</h3>
        ) : client.number_ticket === -2 ||
          client.number_ticket === undefined ? (
          <h3>Нажмите кнопку "Пригласить клиента", чтобы вызвать клиента</h3>
        ) : (
          <>
            <h3>Номер талона: {client.number_ticket}</h3>
            <h3>Услуга: {client.service_ticket}</h3>
          </>
        )}
      </div>
      <footer>
        {employee.status === 1 ? (
          <ButtonStandard
            text={"Пригласить клиента"}
            onClick={getClient}
            inversion={true}
          />
        ) : employee.status === 2 ? (
          <>
            <ButtonStandard
              text={"Клиент пришел"}
              onClick={confirmClient}
              inversion={true}
            />
            <ButtonStandard
              text={"Клиент НЕ пришел"}
              onClick={notCome}
              inversion={true}
            />
          </>
        ) : (
          <ButtonStandard
            text={"Завершить обслуживание"}
            onClick={endClient}
            inversion={true}
          />
        )}
      </footer>
    </div>
  );
};

export default observer(Operator);
