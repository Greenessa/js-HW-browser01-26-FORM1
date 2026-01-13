// TODO: write code here
import ManageList from "./manageList";
import SaveInStorage from "./saveInStorage";

let save = new SaveInStorage(localStorage);
let list = new ManageList(save);
list.loadList()



