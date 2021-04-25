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
     
    public obterUsuario() {         
        return JSON.parse(localStorage.getItem(this.user) || '{}');
    }


    public salvarToken(token: string) {
        localStorage.setItem(this.token, token);
    }

    public obterToken(): string | null {

        return localStorage.getItem(this.token)  ;
    }

    public usuarioLogado() : boolean{
        return this.obterToken() !== null;
    }
 

    public limparDadosLocaisUsuario() {
        localStorage.removeItem(this.token);
        localStorage.removeItem(this.user);
    }

}