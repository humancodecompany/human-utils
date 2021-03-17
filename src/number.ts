import NumberComparison from '../types/NumberComparison';

export default {
    roundAndReturnValue(value: number = 0, fractionDigits: number = 2): number {
        return Number(Number(value).toFixed(fractionDigits));
    },

    isNumeric(text: any): boolean {
        return !Number.isNaN(Number(text));
    },

    percentageDifference(min: number = 0, max: number = 0): number {
        if (!max || max === 0) {
            return 0;
        }

        const subtract = 1 - this.roundAndReturnValue(min / max, 4);
        return this.roundAndReturnValue(subtract * 100);
    },

    roundAndCompareValues(value: number = 0, valueToCompare: number = 0, fractionDigits: number = 2): NumberComparison {
        const fixedValue = this.roundAndReturnValue(value, fractionDigits);
        const fixedValueToCompare = this.roundAndReturnValue(valueToCompare, fractionDigits);

        const isBigger = fixedValue > fixedValueToCompare;
        const isEqual = fixedValue === fixedValueToCompare;
        const isDifferent = !isEqual;
        const isSmaller = fixedValue < fixedValueToCompare;

        return {
            isBigger,
            isEqual,
            isDifferent,
            isSmaller,
        };
    },

    handleExcess(value: number, multiplier: number): number {
        if (value % multiplier !== 0) {
            return Math.floor(value / multiplier) * multiplier;
        }

        return value;
    },

    handleRound(value: number, multiplier: number): number {
        if (value % multiplier !== 0) {
            return Math.ceil(value / multiplier) * multiplier;
        }

        return value;
    },
};
