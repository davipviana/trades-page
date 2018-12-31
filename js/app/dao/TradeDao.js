class TradeDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'trades';
    }

    add(trade) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(trade);

            request.onsuccess = e => resolve();
            request.onerror = e => reject(e.target.error);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readonly')
                .objectStore(this._store)
                .openCursor();

            let trades = [];
            cursor.onsuccess = e => {
                let current = e.target.result;
                if(current) {
                    let trade = current.value;
                    trades.push(new Trade(trade._date, trade._amount, trade._value));

                    current.continue();
                } else {
                    resolve(trades);
                }
            }

            cursor.onerror = e => {
                reject(e.target.error);
            }
        });
    }
}