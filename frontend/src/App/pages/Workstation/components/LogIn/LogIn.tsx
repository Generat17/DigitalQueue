import React from "react";

import ButtonStandard from "@components/Button/ButtonStandard";
import HeaderStandard from "@components/Header/HeaderStandard";
import InputStandard from "@components/Input/InputStandard";
import { Meta } from "@utils/meta";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./LogIn.scss";

type LogInProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;

  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;

  workstationId: string;
  meta: Meta;

  onClick: () => void;
};

const LogIn: React.FC<LogInProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  workstationId,
  meta,
  onClick,
}) => {
  return (
    <div className="login">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Авторизация</title>
      </Helmet>
      <HeaderStandard />
      <div className="content">
        <div className="header-name">
          Авторизация в рабочей станции ID:{workstationId}
        </div>

        <div className="form">
          <h2>Введите ваш логин:</h2>
          <InputStandard
            placeholder="username"
            setInputValue={setUsername}
            inputValue={username}
            type="text"
          />
          <h2>Введите ваш пароль:</h2>
          <InputStandard
            placeholder="password"
            setInputValue={setPassword}
            inputValue={password}
            type="password"
          />

          {meta !== Meta.success && meta !== Meta.initial ? (
            <div className="error-login">Неверный логин или пароль</div>
          ) : (
            ""
          )}

          <div className="button-block">
            <div className="button">
              <Link to={`/`}>
                <ButtonStandard text={"Назад"} />
              </Link>
            </div>
            <div className="button">
              <Link to={``}>
                <ButtonStandard text={"Войти"} onClick={onClick} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
