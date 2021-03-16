import format from 'date-fns/format';

export default {
    cnpjMask(cnpj = '') {
        return cnpj
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    },

    cnpjUnmask(cnpj = '') {
        return cnpj.replace(/\D/g, '');
    },

    cpfMask(cpf = '') {
        return cpf
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    },

    cepMask(cep = '') {
        if (cep) return `${cep.substring(0, 5)}-${cep.substring(5, 8)}`;
        return '';
    },

    cpfUnmask(cpf = '') {
        return cpf.replace(/\D/g, '');
    },

    phoneMask(phone = '') {
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

    phoneUnmask(phone = '') {
        return phone.replace(/\D/g, '');
    },

    // TODO, ESTÁ ADICIONADO CARACTERES QUANDO O NUMERO FOR NEGATIVO -10(,.)00
    moneyMask(amount, dC = 2, decimal = ',', thousands = '.') {
        if (!amount) return '0,00'; // TODO improv via the params
        let newAmount = amount;
        try {
            let decimalCount = dC;
            decimalCount = Math.abs(decimalCount);
            decimalCount = Number.isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = newAmount < 0 ? '-' : '';

            const i = parseInt(newAmount = Math.abs(Number(newAmount) || 0).toFixed(decimalCount), 10).toString();
            const j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign
                + (j ? i.substr(0, j) + thousands : '')
                + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`)
                + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
        } catch (error) {
            return 0;
        }
    },

    moneyUnmask(value = '', dc = 2) {
        let replacedValue = value.replace(/R\$/g, '').replace(/ /g, '').replace(/\./g, '').replace(/,/g, '.');
        replacedValue = replacedValue.replace(/^([^.]*\.)(.*)$/, (a, b, c) => (b + c.replace(/\./g, '')));
        // FIXME Number.isNaN nao funciona por algum motivo. Verificar.
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(replacedValue)) return 0;

        const dotIndex = replacedValue.indexOf('.');
        if (dotIndex !== -1) {
            replacedValue = replacedValue.replace('.', '');
            replacedValue = `${replacedValue.substring(0, replacedValue.length - 2)}.${replacedValue.substring(replacedValue.length - 2)}`;
        } else {
            let newValue = '0.';
            for (let i = replacedValue.length; i < dc; i += 1) {
                newValue += '0';
            }
            replacedValue = `${newValue}${replacedValue}`;
        }
        return Number(replacedValue);
    },

    dateMask(date, pattern = 'dd/MM/yyyy') {
        if (!date) return '-';
        return format(date, pattern);
    },

    digitableLine(line = '') {
        return line
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d{5})/, '$1.$2 ')
            .replace(/(\d{5})(\d{5})/, '$1.$2 ')
            .replace(/(\d{5})(\d{5})/, '$1.$2 ')
            .replace(/(\d{5}).(\d{5}) (\d{5}).(\d{5}) (\d{5}).(\d{5}) (\d)/, '$1.$2 $3.$4 $5.$6 $7 ');
    },
};
