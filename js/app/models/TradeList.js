class TradeList {

    constructor() {
        this._trades = [];
    }

    add(trade) {
        this._trades.push(trade);
    }

    get trades() {
        return [].concat(this._trades);
    }
}