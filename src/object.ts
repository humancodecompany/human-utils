export default {
    getNestedPropertyValue(object: any, nestedProperty: string) {
        let obj = object;
        const split = nestedProperty.split('.');
        for (let z = 0; z < split.length; z++) {
            obj = obj[split[z]];
        }
        return obj;
    },

    isEmpty(obj: any): boolean {
        return Object.keys(obj).length === 0;
     },

    getKeyName(obj: any): string[] {
        const concat = [];
        if (Object.keys(obj).length) {
            // eslint-disable-next-line no-restricted-syntax,guard-for-in
            for (const key in obj) {
                if (key) {
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
        }
        return concat;
    },

    compareArraysDifferent(aArray: [] = [], bArray: [] = [], findProperty: any, ...comparisonPropertyList: [any]): boolean {
        return this.compareArraysDifferentSingleWay(aArray, bArray, findProperty, ...comparisonPropertyList)
            || this.compareArraysDifferentSingleWay(bArray, aArray, findProperty, ...comparisonPropertyList);
    },

    compareArraysDifferentSingleWay(aArray: [] = [], bArray: [] = [], findProperty: any, ...comparisonPropertyList: [any]): boolean {
        let anyDiff = false;

        aArray.forEach((aElem) => {
            const findElem = bArray.find((bElem) => this.getNestedPropertyValue(bElem, findProperty) === this.getNestedPropertyValue(aElem, findProperty));
            if (!findElem) {
                anyDiff = true;
            } else {
                comparisonPropertyList.forEach((property) => {
                    if (this.getNestedPropertyValue(findElem, property) !== this.getNestedPropertyValue(aElem, property)) anyDiff = true;
                });
            }
        });

        return anyDiff;
    }, //
};
