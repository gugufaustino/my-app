import * as moment from 'moment';

export class DateUtils {

  public static DataMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public static DataDayMask = [/\b[0123]/, /\b[0-9]/];
  //public static DataDayMask = [/\b(0?[1-9]|[1-9][0-9]|100)\b/gm];
  public static DataDiaMes = [/\d/, /\d/, '/', /\d/, /\d/];
  static DataPattern: "^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$";

  public static StringFormat(sData: string): string {

    var dt = new Date(sData)
    return dt.toISOString().substring(0, 10);
  }

  public static Format(data: Date, format:string = 'L', uctToLocal:boolean = false): string {
    //L ='dd/MM/YYYY'
    var momentUtc = moment.utc(data)
    momentUtc.locale('pt-br');

    var dt = uctToLocal ? momentUtc.local().format(format) : momentUtc.format(format);
    return dt;
  }

  public static StringParaDate(data: string): Date {

    moment.locale('pt-br');

    var momentUtc = moment.utc(data, 'DD/MM/YYYY')
    var dt = momentUtc.toDate();

    return dt;
  }

  public static DataValida(data: string) : boolean{

    moment.locale('pt-br');
    var momentUtc = moment.utc(data, 'DD/MM/YYYY')
    var valido = momentUtc.isValid();

    return valido;
  }

}

