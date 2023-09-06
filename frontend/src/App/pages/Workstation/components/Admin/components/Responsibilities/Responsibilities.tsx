import React, { useEffect, useState } from "react";

import ButtonStandard from "@components/Button/ButtonStandard";
import ButtonStandardInline from "@components/Button/ButtonStandardInline";
import Confirmation from "@components/Confirmation";
import InputStandard from "@components/Input/InputStandard";
import Notification from "@components/Notification";
import ResponsibilityStore from "@store/ResponsibilityStore";
import { observer } from "mobx-react-lite";
import "./Responsibilities.scss";

// Создаем объект mobX store
const responsibilityStore = new ResponsibilityStore();

const Responsibilities: React.FC<any> = () => {
  const [activeWindow, setActiveWindow] = useState<number>(0);
  const [isNotification, setIsNotification] = useState<boolean>(false);

  const [selectedResponsibilityId, setSelectedResponsibilityId] =
    useState<number>(-1);
  const [valueResponsibilityName, setValueResponsibilityName] =
    useState<string>("");
  const [valueResponsibilityPriority, setValueResponsibilityPriority] =
    useState<string>("-1");

  useEffect(() => {
    responsibilityStore.getResponsibilityList().then();
  }, [activeWindow]);

  return (
    <div className="editor">
      {activeWindow === 0 && (
        <div className="editor-content">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название услуги</th>
                <th>Приоритет</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {responsibilityStore.list
                .sort(function (a, b) {
                  return a.id - b.id;
                })
                .map((it) => (
                  <tr key={it.id}>
                    <td className="td-centre">{it.id}</td>
                    <td>{it.name}</td>
                    <td className="td-centre">{it.priority}</td>
                    <td
                      className="td-button td-centre"
                      onClick={() => {
                        setSelectedResponsibilityId(it.id);
                        setActiveWindow(1);
                      }}
                    >
                      Удалить
                    </td>
                    <td
                      className="td-button td-centre"
                      onClick={() => {
                        setSelectedResponsibilityId(it.id);
                        setValueResponsibilityName(it.name);
                        setValueResponsibilityPriority(it.priority.toString());
                        setActiveWindow(2);
                      }}
                    >
                      Изменить
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ButtonStandardInline
            text={"Добавить услугу"}
            onClick={() => {
              setActiveWindow(3);
              setValueResponsibilityName("");
            }}
          />
          <Notification text={"Выполнено"} isNotification={isNotification} />
        </div>
      )}
      {activeWindow === 1 && (
        <Confirmation
          text={`Вы уверены, что хотите удалить запись с ID: ${selectedResponsibilityId}`}
          yes={() => {
            responsibilityStore
              .removeResponsibility(selectedResponsibilityId)
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
      {activeWindow === 2 && (
        <div className="update">
          <div>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>{selectedResponsibilityId}</th>
                </tr>
                <tr>
                  <th>Название услуги</th>
                  <th>
                    <InputStandard
                      type={"text"}
                      inputValue={valueResponsibilityName}
                      setInputValue={setValueResponsibilityName}
                    />
                  </th>
                </tr>
                <tr>
                  <th>Приоритет</th>
                  <th>
                    <InputStandard
                      type={"text"}
                      inputValue={valueResponsibilityPriority}
                      setInputValue={setValueResponsibilityPriority}
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
                    setActiveWindow(0);
                    setValueResponsibilityName("");
                  }}
                />
              </div>
              <div className="control-button">
                <ButtonStandard
                  text={"Сохранить"}
                  onClick={() => {
                    responsibilityStore
                      .updateResponsibility(
                        selectedResponsibilityId,
                        valueResponsibilityName,
                        valueResponsibilityPriority
                      )
                      .then(() => {
                        setActiveWindow(0);
                      });
                    setValueResponsibilityName("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {activeWindow === 3 && (
        <div className="add">
          <h1>Введите название новой обязанности: </h1>
          <div className="add-input">
            <InputStandard
              type={"text"}
              inputValue={valueResponsibilityName}
              setInputValue={setValueResponsibilityName}
              placeholder={"Полет в космос"}
            />
          </div>

          <div className="control">
            <div className="control-button">
              <ButtonStandard
                text={"Назад"}
                onClick={() => {
                  setActiveWindow(0);
                  setValueResponsibilityName("");
                }}
              />
            </div>
            <div className="control-button">
              <ButtonStandard
                text={"Сохранить"}
                onClick={() => {
                  responsibilityStore
                    .addResponsibility(valueResponsibilityName)
                    .then(() => {
                      setActiveWindow(0);
                    });
                  setValueResponsibilityName("");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(Responsibilities);
