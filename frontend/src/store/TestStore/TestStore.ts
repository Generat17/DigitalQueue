import { makeAutoObservable } from "mobx";

type WaitApi = {
  Coupon: number;
};

class TestStore {
  data: WaitApi = {
    Coupon: -1,
  };

  constructor() {
    makeAutoObservable(this);
  }

  get CouponNumber() {
    return this.data.Coupon;
  }

  fetchGitHub(service: string) {
    fetch(`http://localhost:8080/wait/${service}`)
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .then((json) => {
        this.data = json;
        // eslint-disable-next-line no-console
        console.log(json);
      });
  }
}

export default TestStore;
