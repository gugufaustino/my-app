import { LocalStorageUtils } from "../utils/localstorage";

export abstract class NavigationBaseComponent {
  public localStorageUtils = new LocalStorageUtils();
  usuarioLogado(): boolean {
    return this.localStorageUtils.usuarioLogado();
  }


}
