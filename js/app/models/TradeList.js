class TradeList {

    constructor(trap) {
        this._trades = [];
        this._trap = trap;
    }

    add(trade) {
        this._trades.push(trade);
        this._trap(this)
    }

    get trades() {
        return [].concat(this._trades);
    }

    clear() {
        this._trades = [];
        this._trap(this) 
    }
}