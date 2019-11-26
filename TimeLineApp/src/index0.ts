import { MainView } from "./Main/MainView";
import 'bootstrap'
import { MainModel } from "./Main/MainModel";

(function main() {
  let mainView = new MainView(MainModel.getInstance());
})()