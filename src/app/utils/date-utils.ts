import * as moment from 'moment';

export class DateUtils {
     
    public static DataMask = [ /\d/, /\d/, '/', /\d/, /\d/,'/', /\d/, /\d/, /\d/, /\d/];

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

