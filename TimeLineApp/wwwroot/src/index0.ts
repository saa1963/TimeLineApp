import { MainView } from "./MainView";
import 'bootstrap'
import { MainModel } from "./MainModel";

(function main() {
  let mainView = new MainView(MainModel.getInstance());
})()