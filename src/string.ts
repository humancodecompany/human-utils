import MapHex from '../types/MapHex';

export default {
    isEmpty(str: string): boolean {
        if (str === null) {
            return true;
        }
        return !str.length;
    },

    replaceSpecialChars(str: string = ''): string {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/([^\w]+|\s+)/g, '-')
            .replace(/--+/g, '-')
            .replace(/(^-+|-+$)/, '');
    },

    firstLetterUppercase(str: string = ''): string {
        return str.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, (l) => l.toUpperCase());
    },

    accentRemover(str: string = ''): string {
        let _string = str;
        const mapHex: MapHex = {
            a: /[\xE0-\xE6]/g,
            e: /[\xE8-\xEB]/g,
            i: /[\xEC-\xEF]/g,
            o: /[\xF2-\xF6]/g,
            u: /[\xF9-\xFC]/g,
            c: /\xE7/g,
            n: /\xF1/g,
        };

        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const letter in mapHex) {
            if (letter) {
                // @ts-ignore
                const regEx = mapHex[letter];
                _string = string.replace(regEx, letter);
            }
        }

        return _string;
    },

    copyText(str: string = ''): void {
        const inputTest = document.createElement('input');
        inputTest.value = str;
        document.body.appendChild(inputTest);
        inputTest.select();
        document.execCommand('copy');
        document.body.removeChild(inputTest);
        // feedbackService.showSuccessMessage('Copiado para a Área de Transferência!');
    },

    removeExtension(str: string = ''): string {
        return str.replace(/.\w+$/, '');
    },
};
