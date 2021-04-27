import { Duration } from 'date-fns';
import endOfDay from 'date-fns/endOfDay';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import sub from 'date-fns/sub';
import string from './string';

export default {
    getInitialDate(days: number): number | string {
        if (!days) {
            return '-';
        }
        return startOfDay(sub(new Date(), { days })).getTime();
    },

    getFinalDate(duration: Duration): number | string {
        if (!duration) {
            return '-';
        }
        return endOfDay(sub(new Date(), duration)).getTime();
    },

    displayDate(date: Date): string {
        if (!date) {
            return '-';
        }
        return format(date, 'dd/MM/yyyy');
    },

    displayDateWithoutYear(date: Date): string {
        return format(date, 'dd/MM');
    },

    displayDateAndTime(date: Date): string {
        if (!date) {
            return '-';
        }
        return (`
            ${format(date, 'dd/MM/yyyy')}
            às
            ${format(date, 'HH:mm')}
        `);
    },

    getWeekDaysByNumber(days = []) {
        // TODO:: pessoal de python vai mudar o retorno dos days
        if (!days.length) return '-';
        const dayObj = {
            1: 'Segunda-Feira',
            2: 'Terça-Feira',
            3: 'Quarta-Feira',
            4: 'Quinta-Feira',
            5: 'Sexta-Feira',
            6: 'Sábado',
            7: 'Domingo',
        };
        return days.map((day) => dayObj[day]).join(', ');
    },

    combineDateAndTime(date: Date, time: Date): Date {
        const timeString = `${time.getHours()}:${time.getMinutes()}:00`;

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Jan is 0, dec is 11
        const day = date.getDate();
        const dateString = `${year}-${month}-${day}`;
        return new Date(`${dateString} ${timeString}`);
    },

    explodeDateAndReturnDateAndTime(dateToExplode: Date): { date: string, time: string } {
        const date = format(dateToExplode, 'yyyy-MM-dd');
        const time = format(dateToExplode, 'HH:mm');

        return { date, time };
    },

    sortByDate(items: Array<{[key: string]: Date | any}> | Array<Date>, property: string, desc?: boolean) {
        return (items || []).sort((a, b) => {
            const valueA = a?.[property] || a;
            const valueB = b?.[property] || b;
            return new Date(desc ? valueA : valueB).getTime() - new Date(desc ? valueB : valueA).getTime();
        });
    },

    calcDiffereceTime(date1: Date, date2: Date) {
        const begin = Number(date1);
        const end = Number(date2);

        const diffTime = Math.abs(begin - end);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    },

    biggerThen(startDate: Date, endDate: Date) {
        const begin = Number(startDate);
        const end = Number(endDate);
        return begin > end;
    },

    addHoursFromDate(date: Date, hours: number = 0) {
        const newDate = new Date(date);
        return newDate.setHours(newDate.getHours() + hours);
    },

    removeHoursFromDate(date: Date, hours: number = 0) {
        const newDate = new Date(date);
        return newDate.setHours(newDate.getHours() - hours);
    },

    addDaysFromDate(date: Date, days: number = 0) {
        const newDate = new Date(date);
        return newDate.setDate(newDate.getDate() + days);
    },

    removeDaysFromDate(date: Date, days: number = 0) {
        const newDate = new Date(date);
        return newDate.setDate(newDate.getDate() - days);
    },

};
