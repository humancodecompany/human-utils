import format from 'date-fns/format';

/**
 * Util used to convert common string into converted string. Use this util
 */
export default {
    /**
     *
     * @param cnpj
     */
    cnpjMask(cnpj: string = ''): string {
        return cnpj
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    },

    /**
     *
     * @param { String } cnpj
     */
    cnpjUnmask(cnpj: string = ''): string {
        return cnpj.replace(/\D/g, '');
    },

    /**
     *
     * @param { String } cpf            : string to mask
     */
    cpfMask(cpf: string = ''): string {
        return cpf
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    },

    /**
     *
     * @param { String } cep            : string to mask
     */
    cepMask(cep: string = ''): string {
        return cep
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d{3})\d+?$/, '$1-$2');
    },

    /**
     *
     * @param { String } cpf            : string to unmask
     */
    cpfUnmask(cpf: string = ''): string {
        return cpf.replace(/\D/g, '');
    },

    /**
     *
     * @param { String } phone          : string to mask
     */
    phoneMask(phone: string = ''): string {
        if (phone.length >= 11) {
            return phone
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4,5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1');
        }
        return phone
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    },

    /**
     * Method used to convert string into phone
     * @param { String } phone          : string to unmask
     */
    phoneUnmask(phone: string = ''): string {
        return phone.replace(/\D/g, '');
    },

    /**
     * Method used to convert money into string
     * @param { Number } amount         : value to convert
     * @param { Number } fractionDigits : amount of fraction digits to display
     * @param { String } decimal        : decimal separator
     * @param { String } thousands      : thousand separator
     * @return { String }               : money in string format
     */
    // TODO, ESTÁ ADICIONADO CARACTERES QUANDO O NUMERO FOR NEGATIVO -10(,.)00
    moneyMask(amount: number, fractionDigits: number = 2, decimal: string = ',', thousands: string = '.'): string {
        if (!amount) {
            return '0,00'; // TODO improve via params
        }

        const newAmount = amount;

        try {
            let decimalCount = fractionDigits;
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = newAmount < 0 ? '-' : '';

            const i = parseInt(Math.abs(Number(newAmount) || 0).toFixed(decimalCount), 10).toString();
            const j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign
                + (j ? i.substr(0, j) + thousands : '')
                + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`)
                + (decimalCount ? decimal + Math.abs(amount - Number(i)).toFixed(decimalCount).slice(2) : '');
        } catch (error) {
            return '0';
        }
    },

    /**
     * Method used to convert string into money
     * @param { String } value          : value to convert
     * @param { Number } fractionDigits : amount of fraction digits to display
     */
    moneyUnmask(value: string = '', fractionDigits: number = 2): number {
        let replacedValue = value
            .replace(/R\$/g, '')
            .replace(/ /g, '')
            .replace(/\./g, '')
            .replace(/,/g, '.');

        replacedValue = replacedValue
            .replace(/^([^.]*\.)(.*)$/, (a, b, c) => (b + c.replace(/\./g, '')));

        if (isNaN(Number(replacedValue))) { // FIXME Number.isNaN nao funciona por algum motivo. Verificar.
            return 0;
        }

        const dotIndex = replacedValue.indexOf('.');

        if (dotIndex !== -1) {
            replacedValue = replacedValue.replace('.', '');
            replacedValue = `${replacedValue.substring(0, replacedValue.length - 2)}.${replacedValue.substring(replacedValue.length - 2)}`;
        } else {
            let newValue = '0.';

            for (let i = replacedValue.length; i < fractionDigits; i += 1) {
                newValue += '0';
            }

            replacedValue = `${newValue}${replacedValue}`;
        }

        return Number(replacedValue);
    },

    /**
     * Method to convert date into string
     * @param { Date } date             : value to format (if != null)
     * @param { String } pattern        : pattern to use as format method of date
     * @return { String } - | dd/MM/yyyy
     */
    dateMask(date: Date | null | undefined, pattern: string = 'dd/MM/yyyy'): string {
        if (!date) {
            return '-';
        }
        return format(date, pattern);
    },

    /**
     * Method to convert string into digitable line (exclusively used for brazilian payment)
     * @param { String } str
     * @return { String } 00000.00000 00000.00000 00000.00000 0
     */
    digitableLine(str: string = ''): string {
        return str
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d{5})/, '$1.$2 ')
            .replace(/(\d{5})(\d{5})/, '$1.$2 ')
            .replace(/(\d{5})(\d{5})/, '$1.$2 ')
            .replace(/(\d{5}).(\d{5}) (\d{5}).(\d{5}) (\d{5}).(\d{5}) (\d)/, '$1.$2 $3.$4 $5.$6 $7 ');
    },
};
