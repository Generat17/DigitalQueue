import React, { useEffect, useState } from "react";

import AnalyticsStore from "@store/AnalyticsStore";
import EmployeeStore from "@store/EmployeeStore";
import WorkstationStore from "@store/WorkstationStore";
import { observer } from "mobx-react-lite";
import "./Online.scss";

const analyticsStore = new AnalyticsStore();
const workstationStore = new WorkstationStore();
const employeeStore = new EmployeeStore();
const Online: React.FC<any> = () => {
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    analyticsStore.getQueueAdmin().then();
    workstationStore.getWorkstationList().then();
    employeeStore.getEmployeeList().then();
  }, []);

  return (
    <div className="editor">
      <menu>
        <div className="left-block-tabs">
          <div
            className={`tab ${tab === 0 ? "selectTab" : "defaultTab"}`}
            onClick={() => setTab(0)}
          >
            Очередь
          </div>
          <div
            className={`tab ${tab === 1 ? "selectTab" : "defaultTab"}`}
            onClick={() => setTab(1)}
          >
            Рабочие станции
          </div>
        </div>
        <div className="right-block-tabs">
          <div
            className="tab"
            onClick={() => {
              analyticsStore.getQueueAdmin().then();
              workstationStore.getWorkstationList().then();
              employeeStore.getEmployeeList().then();
            }}
          >
            Обновить данные
          </div>
        </div>
      </menu>
      <div className="editor-content">
        {tab === 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Талон</th>
                  <th>Услуга</th>
                  <th>Приоритет</th>
                  <th>Статус</th>
                  <th>Получен</th>
                  <th>Ожидание</th>
                  <th>Обслуживание</th>
                </tr>
              </thead>
              <tbody>
                {analyticsStore.queue.map((it) => {
                  const startTime = new Date(it.StartTime * 1000);
                  const serviceTime = new Date(it.ServiceTime * 1000);
                  const callTime = new Date(it.CallTime * 1000);
                  const now = new Date();
                  const wait = new Date(now.getTime() - startTime.getTime());
                  const service = new Date(
                    now.getTime() - serviceTime.getTime()
                  );
                  const call = new Date(
                    callTime.getTime() - startTime.getTime()
                  );
                  return (
                    <tr key={it.Id}>
                      <td className="td-centre">{it.Id}</td>
                      <td>{it.ServiceType}</td>
                      <td className="td-centre">{it.Priority}</td>
                      <td>
                        {it.Status === 1 ? (
                          <div className="disabled">Ожидает</div>
                        ) : it.Status === 2 ? (
                          <>
                            <div className="waiting">Вызван</div>
                            <div>
                              {
                                workstationStore.list.find(
                                  (el) =>
                                    el.workstationId === it.WorkstationNumber
                                )?.workstationName
                              }
                            </div>
                            <div>
                              {
                                employeeStore.list.find(
                                  (el) =>
                                    el.employeeId ===
                                    workstationStore.list.find(
                                      (el1) =>
                                        el1.workstationId ===
                                        it.WorkstationNumber
                                    )?.employeeId!
                                )?.firstName
                              }{" "}
                              {
                                employeeStore.list.find(
                                  (el) =>
                                    el.employeeId ===
                                    workstationStore.list.find(
                                      (el1) =>
                                        el1.workstationId ===
                                        it.WorkstationNumber
                                    )?.employeeId!
                                )?.secondName
                              }
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="working">Обслуживается</div>
                            <div>
                              {
                                workstationStore.list.find(
                                  (el) =>
                                    el.workstationId === it.WorkstationNumber
                                )?.workstationName
                              }
                            </div>
                            <div>
                              {
                                employeeStore.list.find(
                                  (el) =>
                                    el.employeeId ===
                                    workstationStore.list.find(
                                      (el1) =>
                                        el1.workstationId ===
                                        it.WorkstationNumber
                                    )?.employeeId!
                                )?.firstName
                              }{" "}
                              {
                                employeeStore.list.find(
                                  (el) =>
                                    el.employeeId ===
                                    workstationStore.list.find(
                                      (el1) =>
                                        el1.workstationId ===
                                        it.WorkstationNumber
                                    )?.employeeId!
                                )?.secondName
                              }
                            </div>
                          </>
                        )}
                      </td>
                      <td className="td-centre">
                        {startTime.getHours()}:{startTime.getMinutes()}:
                        {startTime.getSeconds()}
                      </td>
                      <td className="td-centre">
                        {it.Status === 1 ? (
                          <div>
                            {wait.getUTCHours()}:{wait.getUTCMinutes()}:
                            {wait.getUTCSeconds()}
                          </div>
                        ) : (
                          <div>
                            {call.getUTCHours()}:{call.getUTCMinutes()}:
                            {call.getUTCSeconds()}
                          </div>
                        )}
                      </td>
                      <td className="td-centre">
                        {it.Status === 3 ? (
                          <div>
                            {service.getUTCHours()}:{service.getUTCMinutes()}:
                            {service.getUTCSeconds()}
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        {tab === 1 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Статус</th>
                  <th>Сотрудник</th>
                  <th>Клиент</th>
                  <th>Обслуживание</th>
                </tr>
              </thead>
              <tbody>
                {workstationStore.list.map((it) => {
                  const serviceTime = new Date(
                    analyticsStore.queue.find(
                      (el) => el.WorkstationNumber === it.workstationId
                    )?.ServiceTime! * 1000
                  );
                  const now = new Date();
                  const service = new Date(
                    now.getTime() - serviceTime.getTime()
                  );
                  return (
                    <tr key={it.workstationId + "workstation"}>
                      <td>{it.workstationName}</td>
                      <td>
                        {it.isBusy ? (
                          <div className="working">Работает</div>
                        ) : (
                          <div className="disabled">Не работает</div>
                        )}
                      </td>
                      <td>
                        {
                          employeeStore.list.find(
                            (el) => el.employeeId === it.employeeId
                          )?.firstName
                        }{" "}
                        {
                          employeeStore.list.find(
                            (el) => el.employeeId === it.employeeId
                          )?.secondName
                        }
                      </td>
                      <td>
                        {
                          analyticsStore.queue.find(
                            (el) => el.WorkstationNumber === it.workstationId
                          )?.Id
                        }{" "}
                        {
                          analyticsStore.queue.find(
                            (el) => el.WorkstationNumber === it.workstationId
                          )?.ServiceType
                        }
                      </td>
                      <td className="td-centre">
                        {analyticsStore.queue.find(
                          (el) => el.WorkstationNumber === it.workstationId
                        )?.Status! === 3 ? (
                          <div>
                            {service.getUTCHours()}:{service.getUTCMinutes()}:
                            {service.getUTCSeconds()}
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(Online);
