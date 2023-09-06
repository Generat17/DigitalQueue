import React, { useEffect } from "react";

import HeaderStandard from "@components/Header/HeaderStandard";
import InfoPanel from "@components/InfoPanel";
import ScoreboardStore from "@store/ScoreboardStore";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";
import "./Scoreboard.scss";

// Создаем объект mobX store
const scoreboardStore = new ScoreboardStore();

const Scoreboard: React.FC<any> = () => {
  const [counter, setCounter] = React.useState<number>(0);

  useEffect(() => {
    setTimeout(() => setCounter(counter + 5), 5000);
  }, [counter]);

  useEffect(() => {
    scoreboardStore.getScoreboardList().then();
  }, [counter]);

  return (
    <div className="scoreboard" key="scoreboard">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Информационное табло</title>
      </Helmet>
      <InfoPanel text={"Электронная очередь"} />
      <HeaderStandard />
      <div className="content">
        <div className="left-half">
          <div className="name">В очереди</div>
          <div className="wait">
            {scoreboardStore.queue
              .sort(function (a, b) {
                return a.id - b.id;
              })
              .map((it) => (
                <>
                  {it.workstation === -1 && (
                    <div className="el" key={it.id}>
                      {it.id}
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
        <div className="right-half">
          <div className="name">Приглашение</div>
          <table>
            <thead>
              <tr>
                <th>Талон</th>
                <th>Окно</th>
              </tr>
            </thead>
            <tbody>
              {scoreboardStore.queue
                .sort(function (a, b) {
                  return a.id - b.id;
                })
                .map((it) => (
                  <>
                    {it.workstation !== -1 && (
                      <tr key={it.id}>
                        <th>{it.id}</th>
                        <th>{it.workstation}</th>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default observer(Scoreboard);
