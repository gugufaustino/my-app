export interface MappingModel {
    mappings: any[];    
    toMap(T: any): void;
}

 

export function Mapeable(target: string, obj: any): any {
    console.log(target)
    console.log(obj)
    return;
}

