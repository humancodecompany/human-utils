export default {
    getNestedPropertyValue(object, nestedProperty) {
        let obj = object;
        const split = nestedProperty.split('.');
        for (let z = 0; z < split.length; z++) {
            obj = obj[split[z]];
        }
        return obj;
    },

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
     },

    getKeyName(obj) {
        const concat = [];
        if (Object.keys(obj).length) {
            // eslint-disable-next-line no-restricted-syntax,guard-for-in
            for (const key in obj) {
                const keyName = this.getKeyName(obj[key]);
                if (keyName.length) {
                    for (let i = 0; i < keyName.length; i++) {
                        concat.push(`${key}.${keyName[i]}`);
                    }
                } else {
                    concat.push(key);
                }
            }
        }
        return concat;
    },

    compareArraysDifferent(aArray = [], bArray = [], findProperty, ...comparisonPropertyList) {
        return this.compareArraysDifferentSingleWay(aArray, bArray, findProperty, ...comparisonPropertyList)
            || this.compareArraysDifferentSingleWay(bArray, aArray, findProperty, ...comparisonPropertyList);
    },

    compareArraysDifferentSingleWay(aArray = [], bArray = [], findProperty, ...comparisonPropertyList) {
        let anyDiff = false;

        aArray.forEach((aElem) => {
            const findElem = bArray.find((bElem) => this.getNestedPropertyValue(bElem, findProperty) === this.getNestedPropertyValue(aElem, findProperty));
            if (!findElem) anyDiff = true;
            else {
                comparisonPropertyList.forEach((property) => {
                    if (this.getNestedPropertyValue(findElem, property) !== this.getNestedPropertyValue(aElem, property)) anyDiff = true;
                });
            }
        });

        return anyDiff;
    },

    convertFormula(baseObj, formula) {
        let stringToCalc = formula;
        let pos = -1;
        let lastPos = -1;

        do {
            if (lastPos === -1) pos = stringToCalc.indexOf('@');
            else pos = stringToCalc.indexOf('@', lastPos + 1);

            if (pos !== -1) {
                if (lastPos !== -1) {
                    const property = stringToCalc.substring(lastPos + 1, pos);
                    const value = this.getNestedPropertyValue(baseObj, property);
                    stringToCalc = stringToCalc.replace(`@${property}@`, value);
                    lastPos = -1;
                } else {
                    lastPos = pos;
                }
            }
        } while (pos !== -1);

        return stringToCalc;
    },

    calcString(fn) {
        // eslint-disable-next-line no-new-func
        const calc = new Function(`return ${fn}`)();
        return Number.isNaN(calc) ? 0 : calc;
    },

    convertAndCalcFormula(baseObj, formula) {
        return this.calcString(this.convertFormula(baseObj, formula));
    },
};
