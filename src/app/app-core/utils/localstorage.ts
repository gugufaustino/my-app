import { UserToken } from "../models/user-token";

export class LocalStorageUtils {

    readonly user: string = "userToken";
    readonly token: string = "accessToken";

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarToken(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem(this.user, JSON.stringify(user));
    }

    public obterUsuario():UserToken {
        return JSON.parse(localStorage.getItem(this.user) || '{}');
    }


    public obterClaim(): any[] {
        let lstClmaims = this.obterUsuario()["claims"]
        return lstClmaims;
    }
    public findClaim(key: string): string {
      var lstClaims: any[] = this.obterClaim();
        const value = lstClaims?.find(i => i.type.toLowerCase() === key.toLowerCase());
        return value?.value ?? "";
    }

    public possuiPermissao(permissao: string, acao: string): boolean {

        if (acao == "" || permissao == "")
            return false;

        var lstClaims: any[] = this.obterClaim();
        var claim = lstClaims?.find(i => i.type === permissao);

        if (!claim)
            return false;

        let claimValores = claim.value as string;
        return claimValores.includes(acao);
    }



    public salvarToken(token: string) {
        localStorage.setItem(this.token, token);
    }

    public obterToken(): string | null {

        return localStorage.getItem(this.token);
    }

    public usuarioLogado(): boolean {
        return this.obterToken() !== null;
    }


    public limparDadosLocaisUsuario() {
        localStorage.removeItem(this.token);
        localStorage.removeItem(this.user);
    }

}
