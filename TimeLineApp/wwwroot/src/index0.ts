import { MainView } from "./MainView";
import 'bootstrap'
import * as $ from 'jquery'

(function main() {
  let mainView = new MainView();
  (window.onresize = () => {
    mainView.OnResizeWindow(window.innerWidth, window.innerHeight)
  })()
  document.addEventListener('contextmenu', mainView)
  document.getElementById('btnLogin').onclick = () => {
    mainView.OnLogin()
  }
})()