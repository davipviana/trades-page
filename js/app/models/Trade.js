class Trade {
    constructor(date, amount, value) {
        this._date = date;
        this._amount = amount;
        this._value = value;
    }

    get volume() {
        return this._amount * this._value;
    }

    get date() {
        return this._date;
    }

    get amount() {
        return this._amount;
    }

    get value() {
        return this._value;
    }
}