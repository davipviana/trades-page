class Trade {
    constructor(date, amount, value) {
        this.date = date;
        this.amount = amount;
        this.value = value;
    }

    getVolume() {
        return this.amount * this.value;
    }
}