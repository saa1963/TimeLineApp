import { MainView } from "./MainView";
import 'bootstrap'
import { MainModel } from "./MainModel";

(function main() {
  let mainView = new MainView(MainModel.getInstance());
  (window.onresize = () => {
    mainView.OnResizeWindow(window.innerWidth, window.innerHeight)
  })()
  document.addEventListener('contextmenu', mainView)
  document.getElementById('btnLogin').onclick = () => {
    mainView.OnLogin()
  }
  document.getElementById('btnReg').onclick = () => {
    mainView.OnRegister()
  }
  document.getElementById('newTimeline').onclick = () => {
    mainView.OnNewTL()
  }
  document.getElementById('load').onclick = () => {
    mainView.OnOpenTL()
  }
})()