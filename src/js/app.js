// TODO: write code here
import ManageList from "./manageList";
import SaveInStorage from "./saveInStorage";

// comment this to pass build
const unusedVariable = "variable";

// for demonstration purpose only
export default function demo(value) {
  return `Demo: ${value}`;
}

console.log("app.js included");
let save = new SaveInStorage(localStorage);
let list = new ManageList(save);
list.loadList()



