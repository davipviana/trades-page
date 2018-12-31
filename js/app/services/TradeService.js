class TradeService {

    constructor() {
        this._httpService = new HttpService();
    }

    getWeekTrades() {
        return new Promise((resolve, reject) => {
            this._httpService
                .get('http://localhost:3000/negociacoes/semana')
                .then(trades => {
                    resolve(trades.map((obj) => new Trade(new Date(obj.data), obj.quantidade, obj.valor)))
                })
                .catch(err => reject(err));
        });
    }

    getLastWeekTrades() {
        return new Promise((resolve, reject) => {
            this._httpService
                .get('http://localhost:3000/negociacoes/anterior')
                .then(trades => {
                    resolve(trades.map((obj) => new Trade(new Date(obj.data), obj.quantidade, obj.valor)))
                })
                .catch(err => reject(err));
        });
    }

    getTwoWeeksAgoTrades() {
        return new Promise((resolve, reject) => {
            this._httpService
                .get('http://localhost:3000/negociacoes/retrasada')
                .then(trades => {
                    resolve(trades.map((obj) => new Trade(new Date(obj.data), obj.quantidade, obj.valor)))
                })
                .catch(err => reject(err));
        });
    }

    add(trade) {
        return ConnectionFactory
            .getConnection()
            .then(conn => new TradeDao(conn))
            .then(dao => dao.add(trade))
            .then(() => 'Trade created successfully')
            .catch(() => {
                throw new Error('Could not create trade');
            });
    }

    getAll() {
        return ConnectionFactory
            .getConnection()
            .then(conn => new TradeDao(conn))
            .then(dao => dao.getAll())
            .catch(err => {
                console.log(err);
                throw new Error('Could not get trades');
            });
    }

    clear() {
        return ConnectionFactory
            .getConnection()
            .then(conn => new TradeDao(conn))
            .then(dao => dao.clear())
    }
}