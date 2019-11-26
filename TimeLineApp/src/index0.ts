import { MainView } from "./Main/MainView";
import 'bootstrap'
import { MainModel } from "./Main/MainModel";

(function main() {
  new MainView(MainModel.getInstance());
})()