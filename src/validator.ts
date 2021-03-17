import { cpf, cnpj } from 'cpf-cnpj-validator';

export default {
    cnpjValidation(value: string = ''): boolean {
        return cnpj.isValid(value);
    },

    cpfValidation(value: string = ''): boolean {
        return cpf.isValid(value);
    },

    emailValidation(email: string = ''): boolean {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase());
    },

    phoneValidation(phone: string = ''): boolean {
        const regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
        return regex.test(phone);
    },

};
