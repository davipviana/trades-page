export class DateHelper {

    constructor() {
        throw new Error('DateHelper can not be instantiated');
    }

    static dateToText(date) {
        return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    }

    static textToDate(text) {
        if(!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
            throw new Error('Input format invalid. Must be yyyy-mm-dd')
        }
        
        return new Date(...text.split('-').map((item, index) => item - index % 2))
    }
}