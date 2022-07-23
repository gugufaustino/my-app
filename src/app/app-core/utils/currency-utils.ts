export class CurrencyUtils {

    public static StringParaDecimal(input: any): number {
        if (input === null) return 0;

        input = input.replace("R$ ", '');
        input = input.replace(/\./g, '');
        input = input.replace(/,/g, '.');
        return parseFloat(input);
    }

    public static DecimalParaString(input: any): any {
        var ret = (input) ? input.toString().replace(".", ",") : null;
        if (ret) {
            var decArr = ret.split(",");
            if (decArr.length > 1) {
                var dec = decArr[1].length;
                if (dec === 1) { ret += "0"; }
            }else if(decArr.length === 1){
                ret += ",00"
            }
        }
        return ret;
    }

    public static ExtractNumber(input: any): number {
        input = input.replaceAll('.', '');
        return parseFloat(input.match(/(\d+)/)[0]);
    }

}
