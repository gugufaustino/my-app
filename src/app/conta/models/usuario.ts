//Se não tem comportamento pode ser apenas interface, não precisa ser classe
export interface Usuario{ 
    id: string;
    nome: string;
    cpf: string;    
    email: string;
    telefone: string; 
    password: string;
    confirmPassword: string;
}