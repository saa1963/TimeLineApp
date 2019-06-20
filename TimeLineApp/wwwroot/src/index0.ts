import { MainView } from "./MainView";

(function main() {
  let mainView = new MainView();
  (window.onresize = () => {
    mainView.OnResizeWindow(window.innerWidth, window.innerHeight)
  })()
  window.addEventListener('contextmenu', function (e) { // Не совместимо с IE младше 9 версии
    e.preventDefault();
  }, false);
})()