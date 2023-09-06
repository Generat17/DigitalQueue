import React, { useEffect } from "react";

import ButtonStandard from "@components/Button/ButtonStandard";
import Logo from "@components/Logo";
import QualityControlStore from "@store/QualityControl";
import SadSVG from "@styles/icons/SadSVG";
import SmileSVG from "@styles/icons/SmileSVG";
import { BASE_URL } from "@utils/baseURL";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import "./QualityControl.scss";

const qualityControlStore = new QualityControlStore();

const QualityControl: React.FC<any> = () => {
  const { workstationID } = useParams();
  const [update, setUpdate] = React.useState<boolean>(false);
  const [selectedWindow, setSelectedWindow] = React.useState<number>(0);

  const checkWindow = () => {
    if (
      qualityControlStore.employee.status === 3 &&
      qualityControlStore.queue.quality === 0
    )
      setSelectedWindow(1);
    else if (
      qualityControlStore.employee.status === 3 &&
      qualityControlStore.queue.quality === 1
    )
      setSelectedWindow(2);
    else if (
      qualityControlStore.employee.status === 3 &&
      qualityControlStore.queue.quality === 2
    )
      setSelectedWindow(3);
    else setSelectedWindow(0);
    // eslint-disable-next-line no-console
    console.log("updated");
  };

  useEffect(() => {
    if (workstationID !== undefined) {
      qualityControlStore.getEmployeeStatusList(workstationID).then((r) => {});
      qualityControlStore.getQueueStatus(workstationID).then((r) => {});
    }
  }, [workstationID]);

  useEffect(() => {
    if (workstationID !== undefined) {
      qualityControlStore.getQueueStatus(workstationID).then((r) => {
        checkWindow();
      });
    }
  }, [update, workstationID]);

  useEffect(() => {
    const sse = new EventSource(`${BASE_URL}/events/channel`, {
      withCredentials: true,
    });
    function getRealtimeData() {
      if (workstationID !== undefined) {
        qualityControlStore
          .getEmployeeStatusList(workstationID)
          .then((r) => {});
        qualityControlStore.getQueueStatus(workstationID).then((r) => {
          checkWindow();
        });
      }
    }
    sse.onmessage = (e) => getRealtimeData();
    sse.onerror = () => {
      // error log here

      sse.close();
    };
    return () => {
      sse.close();
    };
  }, [workstationID, update]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Качество обслуживания</title>
      </Helmet>
      {selectedWindow === 0 && (
        <div className="welcome">
          <Logo inversion={true} />
          <h1>Добро пожаловать!</h1>
        </div>
      )}
      {selectedWindow === 1 && (
        <div className="qualityControl">
          <h1>Пожалуйста, оцените качество обслуживания:</h1>
          <div className="control">
            <div className="control-button">
              <ButtonStandard
                text={"Плохо"}
                onClick={() => {
                  qualityControlStore
                    .updateQuality(qualityControlStore.queue.id, 1)
                    .then((r) => {});
                  update ? setUpdate(false) : setUpdate(true);
                }}
              />
            </div>
            <div className="control-button">
              <ButtonStandard
                text={"Хорошо"}
                onClick={() => {
                  qualityControlStore
                    .updateQuality(qualityControlStore.queue.id, 2)
                    .then((r) => {});
                  update ? setUpdate(false) : setUpdate(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {selectedWindow === 2 && (
        <div className="window sad">
          <div>
            Очень жаль, что не оправдали ваших ожиданий. Мы постараемся стать
            лучше.
          </div>
          <div className="svg">
            <SadSVG size={"30vh"} />
          </div>
        </div>
      )}
      {selectedWindow === 3 && (
        <div className="window smile">
          <div>Спасибо за оценку.</div>
          <div>Хорошего дня!</div>
          <div className="svg">
            <SmileSVG size={"30vh"} />
          </div>
        </div>
      )}
    </>
  );
};
export default observer(QualityControl);
