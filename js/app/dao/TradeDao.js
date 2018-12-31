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
}