import { MainView } from "./Main/MainView";
import 'bootstrap'
import 'jquery-contextmenu';
import { MainModel } from "./Main/MainModel";

(function main() {
  new MainView(MainModel.getInstance());
})()