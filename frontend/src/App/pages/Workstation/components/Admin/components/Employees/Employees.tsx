import React, { useEffect, useState } from "react";

import "./Employees.scss";
import ButtonSmall from "@components/Button/ButtonSmall";
import ButtonStandard from "@components/Button/ButtonStandard";
import ButtonStandardInline from "@components/Button/ButtonStandardInline";
import Confirmation from "@components/Confirmation";
import Checkbox from "@components/Input/Checkbox";
import InputStandard from "@components/Input/InputStandard";
import Slider from "@components/Input/Slider";
import Notification from "@components/Notification";
import EmployeeStore from "@store/EmployeeStore";
import ResponsibilityStore from "@store/ResponsibilityStore";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";

const responsibilityStore = new ResponsibilityStore();
const employeeStore = new EmployeeStore();

const Employees: React.FC<any> = () => {
  const [activeWindow, setActiveWindow] = useState<number>(0);

  // Состояние списка
  const [checked, setChecked] = useState<string[]>([]);
  const [checkedId, setCheckedId] = useState<number[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(-1);
  const [valueUsername, setValueUsername] = useState<string>("");
  const [valuePassword, setValuePassword] = useState<string>("");
  const [valueFirstName, setValueFirstName] = useState<string>("");
  const [valueSecondName, setValueSecondName] = useState<string>("");
  const [valueIsAdmin, setValueIsAdmin] = useState<boolean>(false);

  const [isNotification, setIsNotification] = useState<boolean>(false);

  useEffect(() => {
    if (isNotification) {
      setTimeout(() => {
        setIsNotification(false);
      }, 3000);
    }
  }, [isNotification]);

  useEffect(() => {
    responsibilityStore.getResponsibilityList().then();
  }, []);

  useEffect(() => {
    employeeStore.getEmployeeList().then();
  }, [activeWindow]);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log(event.target.value);

    let updatedListName = [...checked];
    let updatedListId = [...checkedId];

    let selectedResponsibility = responsibilityStore.list.find((el) => {
      return el.name === event.target.value;
    });

    if (selectedResponsibility !== undefined) {
      if (event.target.checked) {
        updatedListName = [...checked, event.target.value];
        updatedListId = [...checkedId, selectedResponsibility.id];
      } else {
        updatedListName.splice(checked.indexOf(event.target.value), 1);
        updatedListId.splice(checkedId.indexOf(selectedResponsibility.id), 1);
      }
    }
    setChecked(updatedListName);
    setCheckedId(updatedListId);
  };

  return (
    <div className="editor">
      {activeWindow === 0 && (
        <div className="editor-content">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Пользователя</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Права</th>
                <th>Статус</th>
                <th>Список услуг</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employeeStore.list
                .sort(function (a, b) {
                  return a.employeeId - b.employeeId;
                })
                .map((it) => (
                  <tr key={"employeeID" + it.employeeId}>
                    <td className="td-centre">{it.employeeId}</td>
                    <td>{it.username}</td>
                    <td>{it.firstName}</td>
                    <td>{it.secondName}</td>
                    <td>{it.isAdmin ? "Админ" : "Оператор"}</td>
                    <td>
                      {it.status === 0
                        ? "не в сети"
                        : it.status === 1
                        ? "свободен"
                        : it.status === 2
                        ? "ждет клиента"
                        : "работает с клиентом"}
                    </td>
                    <td>
                      <div className="responsibility-list-name">
                        {it.responsibilityList
                          ?.sort(function (a, b) {
                            return (
                              a.employee_responsibility_id -
                              b.employee_responsibility_id
                            );
                          })
                          .map((el) => (
                            <h4
                              key={
                                it.employeeId +
                                "-" +
                                el.employee_responsibility_id
                              }
                            >
                              {el.employee_responsibility_name}
                            </h4>
                          ))}
                        <ButtonSmall
                          text={"Изменить список услуг"}
                          onClick={() => {
                            setActiveWindow(1);
                            setSelectedEmployeeId(it.employeeId);
                            responsibilityStore.list.map((el) => {
                              checkList.push(el.name);
                              return 0;
                            });
                            it.responsibilityList.map((el) => {
                              checked.push(el.employee_responsibility_name);
                              return 0;
                            });
                            it.responsibilityList.map((el) => {
                              checkedId.push(el.employee_responsibility_id);
                              return 0;
                            });
                          }}
                        />
                      </div>
                    </td>
                    <td
                      className="td-button td-centre"
                      onClick={() => {
                        setSelectedEmployeeId(it.employeeId);
                        setActiveWindow(2);
                        setIsNotification(false);
                      }}
                    >
                      Удалить
                    </td>
                    <td
                      className="td-button td-centre"
                      onClick={() => {
                        setSelectedEmployeeId(it.employeeId);
                        setValueUsername(it.username);
                        setValueIsAdmin(it.isAdmin);
                        setValueFirstName(it.firstName);
                        setValueSecondName(it.secondName);
                        setActiveWindow(3);
                      }}
                    >
                      Изменить
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ButtonStandardInline
            text={"Добавить сотрудника"}
            onClick={() => {
              setActiveWindow(4);
              setValueUsername("");
              setValuePassword("");
              setValueFirstName("");
              setValueSecondName("");
              setValueIsAdmin(false);
            }}
          />
          <Notification text={"Выполнено"} isNotification={isNotification} />
        </div>
      )}
      {activeWindow === 1 && (
        <div className="change">
          <div className="change-content">
            {checkList.map((item, index) => (
              <Checkbox
                value={item}
                onChange={handleCheck}
                checked={checked.includes(item)}
                id={index}
                key={index}
              />
            ))}

            <div className="control">
              <div className="control-button">
                <ButtonStandard
                  text={"Назад"}
                  onClick={() => {
                    setChecked([]);
                    setCheckedId([]);
                    setCheckList([]);
                    setActiveWindow(0);
                  }}
                />
              </div>
              <div className="control-button">
                <ButtonStandard
                  text={"Сохранить"}
                  onClick={() => {
                    employeeStore
                      .updateEmployeeResponsibility(
                        selectedEmployeeId,
                        checkedId
                      )
                      .then();
                    setChecked([]);
                    setCheckedId([]);
                    setCheckList([]);
                    setActiveWindow(0);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {activeWindow === 2 && (
        <Confirmation
          text={`Вы уверены, что хотите удалить запись с ID: ${selectedEmployeeId}`}
          yes={() => {
            employeeStore.removeEmployee(selectedEmployeeId).then(() => {
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
        <div className="update">
          <div>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>{selectedEmployeeId}</th>
                </tr>
                <tr>
                  <th>Пользователь</th>
                  <th>
                    <InputStandard
                      type={"text"}
                      inputValue={valueUsername}
                      setInputValue={setValueUsername}
                    />
                  </th>
                </tr>
                <tr>
                  <th>Имя</th>
                  <th>
                    <InputStandard
                      type={"text"}
                      inputValue={valueFirstName}
                      setInputValue={setValueFirstName}
                    />
                  </th>
                </tr>
                <tr>
                  <th>Фамилия</th>
                  <th>
                    <InputStandard
                      type={"text"}
                      inputValue={valueSecondName}
                      setInputValue={setValueSecondName}
                    />
                  </th>
                </tr>
                <tr>
                  <th>Администратор</th>
                  <th>
                    <Slider
                      id={"update-employee"}
                      value={valueIsAdmin}
                      onChange={() => {
                        valueIsAdmin
                          ? setValueIsAdmin(false)
                          : setValueIsAdmin(true);
                      }}
                    />
                  </th>
                </tr>
              </tbody>
            </table>
            <div className="control">
              <div className="control-button">
                <ButtonStandard
                  text={"Назад"}
                  onClick={() => {
                    setValueUsername("");
                    setActiveWindow(0);
                  }}
                />
              </div>
              <div className="control-button">
                <ButtonStandard
                  text={"Сохранить"}
                  onClick={() => {
                    employeeStore
                      .updateEmployee(
                        selectedEmployeeId,
                        valueUsername,
                        valueFirstName,
                        valueSecondName,
                        valueIsAdmin
                      )
                      .then(() => {
                        setActiveWindow(0);
                      });
                    setValueUsername("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {activeWindow === 4 && (
        <div className="add">
          <h1>Введите данные нового сотрудника: </h1>
          <table>
            <tbody>
              <tr>
                <th>Пользователь</th>
                <th>
                  <InputStandard
                    type={"text"}
                    inputValue={valueUsername}
                    setInputValue={setValueUsername}
                    placeholder={"agent007"}
                  />
                </th>
              </tr>
              <tr>
                <th>Пароль</th>
                <th>
                  <InputStandard
                    type={"text"}
                    inputValue={valuePassword}
                    setInputValue={setValuePassword}
                    placeholder={"qwerty123"}
                  />
                </th>
              </tr>
              <tr>
                <th>Имя</th>
                <th>
                  <InputStandard
                    type={"text"}
                    inputValue={valueFirstName}
                    setInputValue={setValueFirstName}
                    placeholder={"Джеймс"}
                  />
                </th>
              </tr>
              <tr>
                <th>Фамилия</th>
                <th>
                  <InputStandard
                    type={"text"}
                    inputValue={valueSecondName}
                    setInputValue={setValueSecondName}
                    placeholder={"Бонд"}
                  />
                </th>
              </tr>
              <tr>
                <th>Администратор</th>
                <th>
                  <Slider
                    id={"add-employee"}
                    value={valueIsAdmin}
                    onChange={() => {
                      valueIsAdmin
                        ? setValueIsAdmin(false)
                        : setValueIsAdmin(true);
                    }}
                  />
                </th>
              </tr>
            </tbody>
          </table>

          <div className="control">
            <div className="control-button">
              <ButtonStandard
                text={"Назад"}
                onClick={() => {
                  setValueUsername("");
                  setActiveWindow(0);
                }}
              />
            </div>
            <div className="control-button">
              <ButtonStandard
                text={"Сохранить"}
                onClick={() => {
                  employeeStore
                    .addEmployee(
                      valueUsername,
                      valuePassword,
                      valueFirstName,
                      valueSecondName,
                      valueIsAdmin
                    )
                    .then(() => {
                      setActiveWindow(0);
                      if (employeeStore.metaAdd === Meta.success) {
                        setIsNotification(true);
                      }
                      // eslint-disable-next-line no-console
                      console.log(employeeStore.metaAdd);
                    });
                  setValueUsername("");
                  setValuePassword("");
                  setValueFirstName("");
                  setValueSecondName("");
                  setValueIsAdmin(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(Employees);
