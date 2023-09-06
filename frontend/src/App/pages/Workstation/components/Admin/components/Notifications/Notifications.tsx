import React, { useEffect, useState } from "react";

import ButtonSmall from "@components/Button/ButtonSmall";
import ButtonStandard from "@components/Button/ButtonStandard";
import ButtonStandardInline from "@components/Button/ButtonStandardInline";
import Confirmation from "@components/Confirmation";
import InputStandard from "@components/Input/InputStandard";
import Slider from "@components/Input/Slider";
import Notification from "@components/Notification";
import NotificationsStore from "@store/Notifications";
import { observer } from "mobx-react-lite";
import "./Notifications.scss";

const notificationsStore = new NotificationsStore();

const Notifications: React.FC<any> = () => {
  const [activeWindow, setActiveWindow] = useState<number>(0);

  const [valueScriptName, setValueScriptName] = useState<string>("");
  const [valueScriptTime, setValueScriptTime] = useState<string>("");

  const [selectedScriptId, setSelectedScriptId] = useState<number>(0);

  const [selectedEmailId, setSelectedEmailId] = useState<number>(0);
  const [selectedEmailName, setSelectedEmailName] = useState<string>("");

  const [valueEmail, setValueEmail] = useState<string>("");

  const [isNotification, setIsNotification] = useState<boolean>(false);

  useEffect(() => {
    if (isNotification) {
      setTimeout(() => {
        setIsNotification(false);
      }, 3000);
    }
  }, [isNotification]);

  useEffect(() => {
    notificationsStore.getEmailList().then(() => {});
    notificationsStore.getTimingList().then(() => {});
  }, []);

  useEffect(() => {
    notificationsStore.getEmailList().then(() => {});
    notificationsStore.getTimingList().then(() => {});
  }, [activeWindow]);
  return (
    <div className="editor">
      {activeWindow === 0 && (
        <div className="editor-content">
          <table>
            <thead>
              <tr>
                <th>Название сценария</th>
                <th>Время сек.</th>
                <th>Почтовые адреса</th>
                <th>Активировать</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {notificationsStore.listTiming
                .sort(function (a, b) {
                  return a.id - b.id;
                })
                .map((el) => (
                  <tr key={el.id}>
                    <td>{el.name}</td>
                    <td className="td-centre">{el.seconds}</td>
                    <td>
                      {notificationsStore.listEmail.map((it) => (
                        <div key={el.id + "-" + it.id}>
                          {it.timing === el.id ? (
                            <div className="email">
                              <button
                                className="button-remove-email"
                                onClick={() => {
                                  setActiveWindow(4);
                                  setSelectedEmailId(it.id);
                                  setSelectedEmailName(it.email);
                                }}
                              ></button>
                              <h6>{it.email}</h6>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                      <ButtonSmall
                        text={"Добавить новый адрес"}
                        onClick={() => {
                          setSelectedScriptId(el.id);
                          setValueEmail("");
                          setActiveWindow(5);
                        }}
                      />
                    </td>
                    <td className="td-centre">
                      <Slider
                        id={el.id.toString()}
                        value={el.active}
                        onChange={() => {
                          notificationsStore.activeTiming(el.id).then(() => {
                            notificationsStore.getTimingList().then();
                          });
                        }}
                      />
                    </td>
                    <td
                      className="td-button td-centre"
                      onClick={() => {
                        setActiveWindow(2);
                        setValueScriptTime(el.seconds.toString());
                        setValueScriptName(el.name);
                        setSelectedScriptId(el.id);
                      }}
                    >
                      Изменить
                    </td>
                    <td
                      className="td-button td-centre"
                      onClick={() => {
                        setSelectedScriptId(el.id);
                        setActiveWindow(3);
                      }}
                    >
                      Удалить
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ButtonStandardInline
            text={"Добавить новый сценарий"}
            onClick={() => {
              setValueScriptName("");
              setValueScriptTime("");
              setActiveWindow(1);
            }}
          />
          <Notification text={"Выполнено"} isNotification={isNotification} />
        </div>
      )}
      {activeWindow === 1 && (
        <div className="add">
          <div className="add-notification">
            <h1>Создание нового сценария</h1>
            <h2>Введите название нового сценария: </h2>
            <InputStandard
              type="text"
              inputValue={valueScriptName}
              setInputValue={setValueScriptName}
              placeholder={"Уведомление начальника отдела"}
            />
            <h2>Введите время срабатывания (секунды): </h2>
            <InputStandard
              type="text"
              inputValue={valueScriptTime}
              setInputValue={setValueScriptTime}
              placeholder={"1200"}
            />
            <div className="control">
              <div className="control-button">
                <ButtonStandard
                  text={"Назад"}
                  onClick={() => {
                    setValueScriptName("");
                    setActiveWindow(0);
                  }}
                />
              </div>

              <div className="control-button">
                <ButtonStandard
                  text={"Сохранить"}
                  onClick={() => {
                    notificationsStore
                      .addTiming(valueScriptName, valueScriptTime)
                      .then(() => {
                        setValueScriptName("");
                        setActiveWindow(0);
                        setIsNotification(true);
                      });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {activeWindow === 2 && (
        <div className="update">
          <div className="update-notification">
            <h1>Изменение сценария</h1>
            <h2>Название сценария: </h2>
            <InputStandard
              type="text"
              inputValue={valueScriptName}
              setInputValue={setValueScriptName}
              placeholder={"Уведомление начальника отдела"}
            />
            <h2>Время срабатывания (секунды): </h2>
            <InputStandard
              type="text"
              inputValue={valueScriptTime}
              setInputValue={setValueScriptTime}
              placeholder={"1200"}
            />
            <div className="control">
              <div className="control-button">
                <ButtonStandard
                  text={"Назад"}
                  onClick={() => {
                    setValueScriptName("");
                    setActiveWindow(0);
                  }}
                />
              </div>

              <div className="control-button">
                <ButtonStandard
                  text={"Сохранить"}
                  onClick={() => {
                    notificationsStore
                      .updateTiming(
                        selectedScriptId,
                        valueScriptName,
                        valueScriptTime
                      )
                      .then(() => {
                        setValueScriptName("");
                        setSelectedScriptId(-1);
                        setActiveWindow(0);
                        setIsNotification(true);
                      });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {activeWindow === 3 && (
        <Confirmation
          text={`Вы уверены, что хотите удалить сценарий с ID: ${selectedScriptId}`}
          yes={() => {
            notificationsStore.removeTiming(selectedScriptId).then(() => {
              setActiveWindow(0);
              setIsNotification(true);
            });
          }}
          no={() => {
            setActiveWindow(0);
          }}
        />
      )}
      {activeWindow === 4 && (
        <Confirmation
          text={`Вы уверены, что хотите удалить адрес: ${selectedEmailName}`}
          yes={() => {
            notificationsStore.removeEmail(selectedEmailId).then(() => {
              setActiveWindow(0);
              setIsNotification(true);
            });
          }}
          no={() => {
            setActiveWindow(0);
          }}
        />
      )}
      {activeWindow === 5 && (
        <div className="add">
          <div className="add-notification">
            <h1>Добавление нового адреса</h1>
            <h2>Введите новый почтовый адрес: </h2>
            <InputStandard
              type="text"
              inputValue={valueEmail}
              setInputValue={setValueEmail}
              placeholder={"email@outlook.com"}
            />
            <div className="control">
              <div className="control-button">
                <ButtonStandard
                  text={"Назад"}
                  onClick={() => {
                    setValueScriptName("");
                    setActiveWindow(0);
                  }}
                />
              </div>

              <div className="control-button">
                <ButtonStandard
                  text={"Сохранить"}
                  onClick={() => {
                    notificationsStore
                      .addEmail(selectedScriptId, valueEmail)
                      .then(() => {
                        setValueScriptName("");
                        setActiveWindow(0);
                        setIsNotification(true);
                      });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(Notifications);
