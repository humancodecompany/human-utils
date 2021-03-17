export default {
   /** Method used to generate a random password
   * @param { Number } size         : max password characters size
   * @return { String } password    : a random password
   */
    passwordGenerator(size: number): string {
        let pass = '';

        for (let i = 0; i < size; i++) {
            pass += this.getRandomChar();
        }

        return pass;
    },

    getRandomChar() {
        const ascii = [[48, 57], [97, 122], [97, 122], [48, 57], [97, 122], [97, 122]];
        const i = Math.floor(Math.random() * ascii.length);
        return String.fromCharCode(Math.floor(Math.random() * (ascii[i][1] - ascii[i][0])) + ascii[i][0]);
    },
};
