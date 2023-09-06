import React, { useEffect, useState } from "react";

import AnalyticsStore from "@store/AnalyticsStore";
import EmployeeStore from "@store/EmployeeStore";
import { observer } from "mobx-react-lite";
import "./Log.scss";

const analyticsStore = new AnalyticsStore();
const employeeStore = new EmployeeStore();

function tableToCSV() {
  // Variable to store the final csv data
  const csv_data = [
    "ID;Ticket;Priority;Service;WorkstationId;WorkstationName;EmployeeId;EmployeeFirstName;EmployeeSecondName;StartTime;CallTime;ServiceTime;EndTime;Quality\n",
  ];

  analyticsStore.list.map((it) => {
    const startTime = new Date(it.startTime * 1000);
    const callTime = new Date(it.callTime * 1000);
    const serviceTime = new Date(it.serviceTime * 1000);
    const endTime = new Date(it.endTime * 1000);

    const str = `${it.id};${it.ticketNumber};${it.priority};${it.serviceType};${
      it.workstationNumber
    };${it.workstationName};${it.employeeId};${it.employeeFirstName};${
      it.employeeSecondName
    };${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()};${callTime.getHours()}:${callTime.getMinutes()}:${callTime.getSeconds()};${serviceTime.getHours()}:${serviceTime.getMinutes()}:${serviceTime.getSeconds()};${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()};${
      it.quality
    }\n`;
    csv_data.push(str);
  });

  const csv_data_string = csv_data.toString().split(",").join("");

  // Call this function to download csv file
  downloadCSVFile(csv_data_string);
}

function downloadCSVFile(csv_data: string) {
  // Create CSV file object and feed
  // our csv_data into it
  const CSVFile = new Blob([csv_data], {
    type: "text/csv",
  });

  // Create to temporary link to initiate
  // download process
  let temp_link = document.createElement("a");

  // Download csv file
  temp_link.download = "log.csv";
  let url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to
  // trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}
const Log: React.FC<any> = () => {
  const [tab, setTab] = useState<number>(0);
  const [employeeId, setEmployeeId] = useState<number>(-1);
  const [dateFromTab2, setDateFromTab2] = useState<string>("1999-1-1");
  const [dateToTab2, setDateToTab2] = useState<string>("2099-1-1");
  const [dateFromTab3, setDateFromTab3] = useState<string>("1999-1-1");
  const [dateToTab3, setDateToTab3] = useState<string>("2099-1-1");
  const [dateFromTab1, setDateFromTab1] = useState<string>("1999-1-1");
  const [dateToTab1, setDateToTab1] = useState<string>("2099-1-1");
  const [timeValue, setTimeValue] = useState<number>(300);

  useEffect(() => {
    analyticsStore.getLogs().then(() => {
      employeeStore.getEmployeeList().then();
      analyticsStore.getFilterList(dateFromTab1, dateToTab1).then();
      analyticsStore
        .getFilterListTime(dateFromTab3, dateToTab3, timeValue)
        .then();
    });
  }, []);

  useEffect(() => {
    analyticsStore
      .getFilterListEmployee(dateFromTab2, dateToTab2, employeeId)
      .then();
    analyticsStore
      .getFilterListTime(dateFromTab3, dateToTab3, timeValue)
      .then();
  }, [
    employeeId,
    dateFromTab2,
    dateToTab2,
    timeValue,
    dateFromTab3,
    dateToTab3,
  ]);

  useEffect(() => {
    analyticsStore.getFilterList(dateFromTab1, dateToTab1).then();
  }, [dateFromTab1, dateToTab1]);

  return (
    <div className="editor">
      <menu>
        <div className="left-block-tabs">
          <div
            className={`tab ${tab === 0 ? "selectTab" : "defaultTab"}`}
            onClick={() => setTab(0)}
          >
            История талонов
          </div>
          <div
            className={`tab ${tab === 1 ? "selectTab" : "defaultTab"}`}
            onClick={() => setTab(1)}
          >
            Сотрудники
          </div>
          <div
            className={`tab ${tab === 2 ? "selectTab" : "defaultTab"}`}
            onClick={() => setTab(2)}
          >
            Время ожидания
          </div>
        </div>
        <div className="right-block-tabs">
          <div className="tab" onClick={tableToCSV}>
            Скачать CSV
          </div>
          <div
            className="tab"
            onClick={() => {
              analyticsStore.getLogs().then();
            }}
          >
            Обновить данные
          </div>
        </div>
      </menu>
      <div className="editor-content">
        {tab === 0 && (
          <>
            <div className="employee-menu">
              <label>От</label>
              <input
                type="date"
                className="date"
                onChange={(e) => {
                  setDateFromTab1(e.target.value);
                }}
              />
              <label>До</label>
              <input
                type="date"
                className="date"
                onChange={(e) => {
                  setDateToTab1(e.target.value);
                }}
              />
            </div>
            <div className="summary">
              Всего талонов: <h1>{analyticsStore.totalCoupon}</h1> Плохих
              оценок: <h1>{analyticsStore.totalQuality}</h1> Среднее время
              обслуживания:{" "}
              <h1>
                {analyticsStore.totalTime === 0 ? (
                  0
                ) : (
                  <>
                    {Math.trunc(
                      analyticsStore.totalTime /
                        analyticsStore.totalCoupon /
                        60 /
                        60
                    )}
                    :
                    {Math.trunc(
                      (analyticsStore.totalTime /
                        analyticsStore.totalCoupon /
                        60) %
                        60
                    )}
                    :
                    {Math.trunc(
                      ((analyticsStore.totalTime / analyticsStore.totalCoupon) %
                        60) %
                        60
                    )}
                  </>
                )}
              </h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Талон</th>
                  <th>Приор.</th>
                  <th>Сервис</th>
                  <th>ID стан.</th>
                  <th>Станция</th>
                  <th>ID сотр.</th>
                  <th>Сотрудник</th>
                  <th>Дата</th>
                  <th>Начало</th>
                  <th>Вызов</th>
                  <th>Обслуж.</th>
                  <th>Конец</th>
                  <th>Оценка</th>
                  <th>Время ожид.</th>
                  <th>Время обслуж.</th>
                </tr>
              </thead>
              <tbody>
                {analyticsStore.list
                  .filter((it) => {
                    const dateFromFormat = new Date(dateFromTab1);
                    dateFromFormat.setHours(0);
                    const dateToFormat = new Date(dateToTab1);
                    dateToFormat.setHours(23);
                    dateToFormat.setMinutes(59);
                    const startTime = new Date(it.startTime * 1000);

                    if (
                      dateFromFormat <= startTime &&
                      startTime <= dateToFormat
                    ) {
                      return it;
                    }
                  })
                  .map((it) => {
                    const startTime = new Date(it.startTime * 1000);
                    const callTime = new Date(it.callTime * 1000);
                    const serviceTime = new Date(it.serviceTime * 1000);
                    const endTime = new Date(it.endTime * 1000);

                    return (
                      <tr key={it.id}>
                        <td className="td-centre">{it.id}</td>
                        <td className="td-centre">{it.ticketNumber}</td>
                        <td className="td-centre">{it.priority}</td>
                        <td>{it.serviceType}</td>
                        <td className="td-centre">{it.workstationNumber}</td>
                        <td>{it.workstationName}</td>
                        <td className="td-centre">{it.employeeId}</td>
                        <td>
                          {it.employeeFirstName} {it.employeeSecondName}
                        </td>
                        <td className="td-centre">
                          {startTime.getUTCDate()}-{startTime.getUTCMonth() + 1}
                          -{startTime.getUTCFullYear()}
                        </td>
                        <td className="td-centre">
                          {startTime.getHours()}:{startTime.getMinutes()}:
                          {startTime.getSeconds()}
                        </td>
                        <td className="td-centre">
                          {callTime.getHours()}:{callTime.getMinutes()}:
                          {callTime.getSeconds()}
                        </td>
                        <td className="td-centre">
                          {serviceTime.getHours()}:{serviceTime.getMinutes()}:
                          {serviceTime.getSeconds()}
                        </td>
                        <td className="td-centre">
                          {endTime.getHours()}:{endTime.getMinutes()}:
                          {endTime.getSeconds()}
                        </td>
                        <td className="td-centre">{it.quality}</td>
                        <td className="td-centre">
                          {Math.trunc((it.callTime - it.startTime) / 60 / 60)}:
                          {Math.trunc((it.callTime - it.startTime) / 60) % 60}:
                          {((it.callTime - it.startTime) % 60) % 60}
                        </td>
                        <td className="td-centre">
                          {Math.trunc((it.endTime - it.serviceTime) / 60 / 60)}:
                          {Math.trunc((it.endTime - it.serviceTime) / 60) % 60}:
                          {((it.endTime - it.serviceTime) % 60) % 60}
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
            <div className="employee-menu">
              <label>Сотрудник</label>
              <select
                onChange={(e) => {
                  setEmployeeId(Number(e.target.value));
                }}
              >
                {employeeStore.list.map((el) => {
                  if (el.employeeId === employeeId)
                    return (
                      <option
                        value={el.employeeId}
                        selected
                        key={"option" + el.employeeId}
                      >
                        {el.firstName} {el.secondName}
                      </option>
                    );
                  else
                    return (
                      <option value={el.employeeId}>
                        {el.firstName} {el.secondName}
                      </option>
                    );
                })}
              </select>
              <label>От</label>
              <input
                type="date"
                className="date"
                onChange={(e) => {
                  setDateFromTab2(e.target.value);
                }}
              />
              <label>До</label>
              <input
                type="date"
                className="date"
                onChange={(e) => {
                  setDateToTab2(e.target.value);
                }}
              />
            </div>
            <div className="summary">
              Всего талонов: <h1>{analyticsStore.totalCouponEmployee}</h1>{" "}
              Плохих оценок: <h1>{analyticsStore.totalQualityEmployee}</h1>{" "}
              Среднее время обслуживания:{" "}
              <h1>
                {analyticsStore.totalTimeEmployee === 0 ? (
                  0
                ) : (
                  <>
                    {Math.trunc(
                      analyticsStore.totalTimeEmployee /
                        analyticsStore.totalCouponEmployee /
                        60 /
                        60
                    )}
                    :
                    {Math.trunc(
                      (analyticsStore.totalTimeEmployee /
                        analyticsStore.totalCouponEmployee /
                        60) %
                        60
                    )}
                    :
                    {Math.trunc(
                      ((analyticsStore.totalTimeEmployee /
                        analyticsStore.totalCouponEmployee) %
                        60) %
                        60
                    )}
                  </>
                )}
              </h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Талон</th>
                  <th>Сервис</th>
                  <th>Станция</th>
                  <th>Дата</th>
                  <th>Обслуж.</th>
                  <th>Конец</th>
                  <th>Оценка</th>
                  <th>Время обслуж.</th>
                </tr>
              </thead>
              <tbody>
                {analyticsStore.filterListEmployee.map((it) => {
                  const startTime = new Date(it.startTime * 1000);
                  const serviceTime = new Date(it.serviceTime * 1000);
                  const endTime = new Date(it.endTime * 1000);

                  return (
                    <tr key={it.id}>
                      <td className="td-centre">{it.ticketNumber}</td>
                      <td>{it.serviceType}</td>
                      <td>{it.workstationName}</td>
                      <td className="td-centre">
                        {startTime.getUTCDate()}-{startTime.getUTCMonth() + 1}-
                        {startTime.getUTCFullYear()}
                      </td>
                      <td className="td-centre">
                        {serviceTime.getHours()}:{serviceTime.getMinutes()}:
                        {serviceTime.getSeconds()}
                      </td>
                      <td className="td-centre">
                        {endTime.getHours()}:{endTime.getMinutes()}:
                        {endTime.getSeconds()}
                      </td>
                      <td className="td-centre">{it.quality}</td>
                      <td className="td-centre">
                        {Math.trunc((it.endTime - it.serviceTime) / 60 / 60)}:
                        {Math.trunc((it.endTime - it.serviceTime) / 60) % 60}:
                        {Math.trunc(((it.endTime - it.serviceTime) % 60) % 60)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        {tab === 2 && (
          <>
            <div className="employee-menu">
              <label>Секунд</label>
              <input
                type="text"
                className="date"
                value={timeValue}
                onChange={(e) => {
                  setTimeValue(Number(e.target.value));
                }}
              />
              <label>От</label>
              <input
                type="date"
                className="date"
                onChange={(e) => {
                  setDateFromTab3(e.target.value);
                }}
              />
              <label>До</label>
              <input
                type="date"
                className="date"
                onChange={(e) => {
                  setDateToTab3(e.target.value);
                }}
              />
            </div>
            <div className="summary">
              Всего талонов: <h1>{analyticsStore.totalCouponTime}</h1> Плохих
              оценок: <h1>{analyticsStore.totalQualityTime}</h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Талон</th>
                  <th>Приор.</th>
                  <th>Сервис</th>
                  <th>Станция</th>
                  <th>Сотрудник</th>
                  <th>Дата</th>
                  <th>Начало</th>
                  <th>Вызов</th>
                  <th>Оценка</th>
                  <th>Время ожид.</th>
                </tr>
              </thead>
              <tbody>
                {analyticsStore.list
                  .filter((it) => {
                    const dateFromFormat = new Date(dateFromTab3);
                    dateFromFormat.setHours(0);
                    const dateToFormat = new Date(dateToTab3);
                    dateToFormat.setHours(23);
                    dateToFormat.setMinutes(59);
                    const startTime = new Date(it.startTime * 1000);

                    if (
                      dateFromFormat <= startTime &&
                      startTime <= dateToFormat &&
                      it.callTime - it.startTime >= timeValue
                    ) {
                      return it;
                    }
                  })
                  .map((it) => {
                    const startTime = new Date(it.startTime * 1000);
                    const callTime = new Date(it.callTime * 1000);

                    return (
                      <tr key={it.id}>
                        <td className="td-centre">{it.ticketNumber}</td>
                        <td className="td-centre">{it.priority}</td>
                        <td>{it.serviceType}</td>
                        <td>{it.workstationName}</td>
                        <td>
                          {it.employeeFirstName} {it.employeeSecondName}
                        </td>
                        <td className="td-centre">
                          {startTime.getUTCDate()}-{startTime.getUTCMonth() + 1}
                          -{startTime.getUTCFullYear()}
                        </td>
                        <td className="td-centre">
                          {startTime.getHours()}:{startTime.getMinutes()}:
                          {startTime.getSeconds()}
                        </td>
                        <td className="td-centre">
                          {callTime.getHours()}:{callTime.getMinutes()}:
                          {callTime.getSeconds()}
                        </td>
                        <td className="td-centre">{it.quality}</td>
                        <td className="td-centre">
                          {Math.trunc((it.callTime - it.startTime) / 60 / 60)}:
                          {Math.trunc((it.callTime - it.startTime) / 60) % 60}:
                          {((it.callTime - it.startTime) % 60) % 60}
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

export default observer(Log);
