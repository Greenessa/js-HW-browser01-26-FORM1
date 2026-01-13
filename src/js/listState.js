
export default class ListState {
    constructor() {
        this.goodsArray = [["Iphone XR", 60000], ["Samsung Galaxy S10+", 80000], ["Huawey View", 50000]];
    }

    static from(object) {
        if (typeof object === "object" && object !== null) {
          const instance = new ListState();
          instance.goodsArray = object.goodsArray || [];
          return instance;
        }
        return new ListState(); // Возвращаем новый экземпляр, если объект некорректен
      }
}


