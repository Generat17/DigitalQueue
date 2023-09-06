import React from "react";

import { observer } from "mobx-react-lite";

import "./Presentation.scss";

const Presentation: React.FC<any> = () => {
  return (
    <div className="presentation">
      <header className="presentation-header">
        <div className="header-content">
          <h1>Электронная очередь</h1>
          <p>
            Программно-аппаратный комплекс, позволяющий
            <br />
            организовать поток клиентов и управлять им.
          </p>
          <div className="header-actions">
            <a href="/" className="presentation-button">
              Поробовать
            </a>
            <a href="#one" className="presentation-button">
              Узнать больше
            </a>
          </div>
        </div>
        <div className="header-image">
          <img src={require("./images/kiosk.png")} alt="" />
        </div>
      </header>

      <section id="one" className="wrapper">
        <div className="inner-wrapper">
          <div className="content-wrapper">
            <h1>Функции электронной очереди:</h1>
            <h3>
              <ul>
                <li>Управление потоком клиентов</li>
                <li>Сбор аналитических данных</li>
                <li>Составление автоматизированных отчетов</li>
                <li>
                  Уведомления о случаях длительного ожидания клиента в очереди
                </li>
                <li>Мониторинг текущего состояния очереди и рабочих мест</li>
                <li>
                  Обеспечение обратной связи с клиентом посредством оценки
                  качества обслуживания
                </li>
              </ul>
            </h3>
          </div>
          <div className="content-wrapper">
            <h1>Преимущества электронной очереди:</h1>
            <h3>
              <ul>
                <li>Отсутствие живых очередей</li>
                <li>Оптимизация потока клиентов</li>
                <li>Улучшение качества и скорости обслуживания</li>
                <li>Экономия сил и рабочего времени персонала</li>
                <li>Увеличение вероятности повторного обращения клиента</li>
              </ul>
            </h3>
          </div>
        </div>
      </section>
      <section id="two" className="wrapper">
        {/*Регистрационный терминал*/}
        <div className="inner-wrapper">
          <div className="image">
            <img src={require("./images/reception.jpg")} alt="" />
          </div>
          <div className="content-wrapper">
            <h3>Регистрационный терминал</h3>
            <p>
              Используется для регистрации новых клиентов и выдачи талонов на
              очередь.
            </p>
          </div>
        </div>
        {/*Информационное табло*/}
        <div className="inner-wrapper reverse">
          <div className="image">
            <img src={require("./images/scoreboard.jpg")} alt="" />
          </div>
          <div className="content-wrapper">
            <h3>Информационное табло</h3>
            <p>
              Используется для регистрации новых клиентов и выдачи талонов на
              очередь.
            </p>
          </div>
        </div>
        {/*ЛК оператора*/}
        <div className="inner-wrapper">
          <div className="image">
            <img src={require("./images/operator.jpg")} alt="" />
          </div>
          <div className="content-wrapper">
            <h3>Личный кабинет оператора</h3>
            <p>
              Используется для регистрации новых клиентов и выдачи талонов на
              очередь.
            </p>
          </div>
        </div>
        {/*ЛК администратора*/}
        <div className="inner-wrapper reverse">
          <div className="image">
            <img src={require("./images/admin.jpg")} alt="" />
          </div>
          <div className="content-wrapper">
            <h3>Личный кабинет администратора</h3>
            <p>
              Используется для регистрации новых клиентов и выдачи талонов на
              очередь.
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div className="card">
          <img
            src={require("./images/developer.jpg")}
            alt=""
            className="img-developer"
          />
          Алиев Тимур Муратович
        </div>
        <div className="contacts">
          <b>Почта:</b>
          <br></br>
          alievtm@gmail.com<br></br>
          <br></br>
          <b>GitHub:</b>
          <br></br>
          github.com/Generat17<br></br>
          <br></br>
          <b>Telegram:</b>
          <br></br>
          @Aliev_Timur_M<br></br>
        </div>
      </footer>
    </div>
  );
};

export default observer(Presentation);
