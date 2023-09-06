import React, { useEffect } from "react";
import "./Reception.scss";

import ButtonBig from "@components/Button/ButtonBig";
import InfoPanel from "@components/InfoPanel";
import Logo from "@components/Logo";
import ResponsibilityStore from "@store/ResponsibilityStore";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

// Создаем объект mobX store
const responsibilityStore = new ResponsibilityStore();

const Reception: React.FC<any> = () => {
  useEffect(() => {
    responsibilityStore.getResponsibilityList().then();
  }, []);

  return (
    <div className="reception">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Регистрационный терминал</title>
      </Helmet>
      <InfoPanel text={"Регистрационный терминал"} />
      <div className="content">
        <div className="left-half">
          <Logo />
          <div className="welcome-msg">
            Здесь можно взять талон электронной очереди
          </div>
        </div>
        <div className="right-half">
          <div className="inner-block">
            <div className="info">
              Выберите необходимую услугу, возьмите ваш талон и ожидайте очереди
            </div>
            {responsibilityStore.list.map((it) => (
              <Link to={`/wait/${it.name}`} key={it.id}>
                <ButtonBig text={it.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default observer(Reception);
