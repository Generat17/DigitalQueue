import React, { useEffect, useState } from "react";

import ButtonSmall from "@components/Button/ButtonSmall";
import ButtonStandard from "@components/Button/ButtonStandard";
import ButtonStandardInline from "@components/Button/ButtonStandardInline";
import Confirmation from "@components/Confirmation";
import Checkbox from "@components/Input/Checkbox";
import InputStandard from "@components/Input/InputStandard";
import Notification from "@components/Notification";
import ResponsibilityStore from "@store/ResponsibilityStore";
import WorkstationStore from "@store/WorkstationStore";
import { observer } from "mobx-react-lite";

import "./Workstations.scss";

// Создаем объект mobX store
const workstationStore = new WorkstationStore();
const responsibilityStore = new ResponsibilityStore();

const Workstations: React.FC<any> = () => {
  const [activeWindow, setActiveWindow] = useState<number>(0);

  // Состояние списка
  const [checked, setChecked] = useState<string[]>([]);
  const [checkedId, setCheckedId] = useState<number[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);

  const [selectedWorkstationId, setSelectedWorkstationId] =
    useState<number>(-1);
  const [valueWorkstationName, setValueWorkstationName] = useState<string>("");

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
    workstationStore.getWorkstationList().then();
  }, [activeWindow]);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                <th>Название рабочей станции</th>
                <th>Список услуг</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {workstationStore.list
                .sort(function (a, b) {
                  return a.workstationId - b.workstationId;
                })
                .map((it) => (
                  <tr key={"workstationID" + it.workstationId}>
                    <td className="td-centre">{it.workstationId}</td>
                    <td>{it.workstationName}</td>
                    <td>
                      <div className="responsibility-list-name">
                        {it.responsibilityList
                          ?.sort(function (a, b) {
                            return (
                              a.workstation_responsibility_id -
                              b.workstation_responsibility_id
                            );
                          })
                          .map((el) => (
                            <h4
                              key={
                                it.workstationId +
                                "-" +
                                el.workstation_responsibility_id
                              }
                            >
                              {el.workstation_responsibility_name}
                            </h4>
                          ))}
                        <ButtonSmall
                          text={"Изменить список услуг"}
                          onClick={() => {
                            setActiveWindow(1);
                            setSelectedWorkstationId(it.workstationId);
                            responsibilityStore.list.map((el) => {
                              checkList.push(el.name);
                              return 0;
                            });
                            it.responsibilityList.map((el) => {
                              checked.push(el.workstation_responsibility_name);
                              return 0;
                            });
                            it.responsibilityList.map((el) => {
                              checkedId.push(el.workstation_responsibility_id);
                              return 0;
                            });
                          }}
                        />
                      </div>
                    </td>
                    <td
                      className="td-button td-centre"
                      onClick={() => {
                        setSelectedWorkstationId(it.workstationId);
                        setActiveWindow(2);
                        setIsNotification(false);
                      }}
                    >
                      Удалить
                    </td>
                    <td
                      className="td-button td-centre"
                      onClick={() => {
                        setSelectedWorkstationId(it.workstationId);
                        setValueWorkstationName(it.workstationName);
                        setActiveWindow(3);
                        setIsNotification(false);
                      }}
                    >
                      Изменить
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ButtonStandardInline
            text={"Добавить рабочее место"}
            onClick={() => {
              setActiveWindow(4);
              setValueWorkstationName("");
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
                    workstationStore
                      .updateWorkstationResponsibility(
                        selectedWorkstationId,
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
          text={`Вы уверены, что хотите удалить запись с ID: ${selectedWorkstationId}`}
          yes={() => {
            workstationStore
              .removeWorkstation(selectedWorkstationId)
              .then(() => {
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
          <div className="update-ws">
            <div>
              <h2>ID рабочего места: {selectedWorkstationId}</h2>
            </div>

            <h2>Измените название:</h2>
            <InputStandard
              type={"text"}
              inputValue={valueWorkstationName}
              setInputValue={setValueWorkstationName}
            />
            <div className="control">
              <div className="control-button">
                <ButtonStandard
                  text={"Назад"}
                  onClick={() => {
                    setValueWorkstationName("");
                    setActiveWindow(0);
                  }}
                />
              </div>
              <div className="control-button">
                <ButtonStandard
                  text={"Сохранить"}
                  onClick={() => {
                    workstationStore
                      .updateWorkstation(
                        selectedWorkstationId,
                        valueWorkstationName
                      )
                      .then(() => {
                        setActiveWindow(0);
                      });
                    setValueWorkstationName("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {activeWindow === 4 && (
        <div className="add">
          <h1>Введите название новой рабочей станции: </h1>
          <div className="add-input">
            <InputStandard
              type={"text"}
              inputValue={valueWorkstationName}
              setInputValue={setValueWorkstationName}
              placeholder={"касса №007"}
            />
          </div>

          <div className="control">
            <div className="control-button">
              <ButtonStandard
                text={"Назад"}
                onClick={() => {
                  setValueWorkstationName("");
                  setActiveWindow(0);
                }}
              />
            </div>
            <div className="control-button">
              <ButtonStandard
                text={"Сохранить"}
                onClick={() => {
                  workstationStore
                    .addWorkstation(valueWorkstationName)
                    .then(() => {
                      setActiveWindow(0);
                    });
                  setValueWorkstationName("");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(Workstations);
