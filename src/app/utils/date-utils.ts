import * as moment from 'moment';
import { Pagamento } from '../contas-a-pagar/models/pagamento';

export class DateUtils {
     
    public static DataMask = [ /\d/, /\d/, '/', /\d/, /\d/,'/', /\d/, /\d/, /\d/, /\d/];
    public static DataDayMask = [/\b[0123]/,/\b[0-9]/];
    //public static DataDayMask = [/\b(0?[1-9]|[1-9][0-9]|100)\b/gm];
    public static DataDiaMes= [/\d/, /\d/, '/', /\d/, /\d/];

    public static StringFormat(sData : string) : string {
        
        var dt = new Date(sData)
        return dt.toISOString().substring(0,10);
    }

    public static Format(data : Date) : string {

        var momentUtc = moment.utc(data)
        momentUtc.locale('pt-br');
        var dt = momentUtc.format('L');
        return dt;
    }

    public static StringParaDate(data : string) : Date {
 
        moment.locale('pt-br');     
        
        var momentUtc  =  moment.utc(data, 'DD/MM/YYYY') 
        var dt =  momentUtc.toDate();

        return dt;
    } 
    
}

