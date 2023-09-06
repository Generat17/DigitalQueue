import React, { useEffect } from "react";

import ButtonStandard from "@components/Button/ButtonStandard";
import HeaderStandard from "@components/Header/HeaderStandard";
import InfoPanel from "@components/InfoPanel";
import WaitStore from "@store/WaitStore";
import { observer } from "mobx-react-lite";
import QRCode from "react-qr-code";
import { useNavigate, useParams, Link } from "react-router-dom";

import "./Wait.scss";

const waitStore = new WaitStore();

const Wait: React.FC<any> = () => {
  const { service } = useParams();
  const [counter, setCounter] = React.useState<number>(15);
  const navigate = useNavigate();

  useEffect(() => {
    if (service !== undefined) {
      waitStore.getTicket(service).then(() => {
        // Тут можно огранизовать печать талона
        //print(waitStore.ticketNumber.toString());
      });
    }
  }, [service]);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      navigate(`/reception`);
    }
  }, [counter, navigate]);

  // print вызывает меню для печати талона
  /*function print(content: string) {
    let winPrint = window.open(
      "",
      "",
      "left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0"
    );

    if (winPrint !== undefined) {
      winPrint!.document.write(content);
      winPrint!.document.close();
      winPrint!.print();
      winPrint!.close();
    }
  }*/

  return (
    <div className="wait">
      <InfoPanel text={"Выдача талона"} />
      <HeaderStandard />

      <div className="content">
        <h2>Номер вашего талона: </h2>
        <h1>{waitStore.ticketNumber}</h1>
        <div className={"qr-code"}>
          <QRCode
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={waitStore.ticketNumber.toString()}
            viewBox={`0 0 256 256`}
            bgColor={"#F1F1F1"}
          />
        </div>
        <div className="button">
          <Link to="/reception">
            <ButtonStandard key="backBtn" text={"Перейти в главное меню"} />
          </Link>
        </div>
      </div>

      <div className="timer" key="timer">
        <h4>Автоматический переход в главное меню через: </h4>
        <h3>{counter} сек.</h3>
      </div>
    </div>
  );
};

export default observer(Wait);
