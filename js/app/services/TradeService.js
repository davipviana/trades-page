'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TradeService = function () {
    function TradeService() {
        _classCallCheck(this, TradeService);

        this._httpService = new HttpService();
    }

    _createClass(TradeService, [{
        key: 'getWeekTrades',
        value: function getWeekTrades() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this._httpService.get('http://localhost:3000/negociacoes/semana').then(function (trades) {
                    resolve(trades.map(function (obj) {
                        return new Trade(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'getLastWeekTrades',
        value: function getLastWeekTrades() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._httpService.get('http://localhost:3000/negociacoes/anterior').then(function (trades) {
                    resolve(trades.map(function (obj) {
                        return new Trade(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'getTwoWeeksAgoTrades',
        value: function getTwoWeeksAgoTrades() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3._httpService.get('http://localhost:3000/negociacoes/retrasada').then(function (trades) {
                    resolve(trades.map(function (obj) {
                        return new Trade(new Date(obj.data), obj.quantidade, obj.valor);
                    }));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'add',
        value: function add(trade) {
            return ConnectionFactory.getConnection().then(function (conn) {
                return new TradeDao(conn);
            }).then(function (dao) {
                return dao.add(trade);
            }).then(function () {
                return 'Trade created successfully';
            }).catch(function () {
                throw new Error('Could not create trade');
            });
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            return ConnectionFactory.getConnection().then(function (conn) {
                return new TradeDao(conn);
            }).then(function (dao) {
                return dao.getAll();
            }).catch(function (err) {
                console.log(err);
                throw new Error('Could not get trades');
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            return ConnectionFactory.getConnection().then(function (conn) {
                return new TradeDao(conn);
            }).then(function (dao) {
                return dao.clear();
            });
        }
    }, {
        key: 'import',
        value: function _import(currentTradeList) {
            return Promise.all([this.getWeekTrades(), this.getLastWeekTrades(), this.getTwoWeeksAgoTrades()]).then(function (trades) {
                return trades.reduce(function (resultArray, array) {
                    return resultArray.concat(array);
                }, []).filter(function (t) {
                    return !currentTradeList.some(function (t2) {
                        return JSON.stringify(t) == JSON.stringify(t2);
                    });
                });
            }).catch(function (err) {
                console.log('Error: ' + err);
                throw new Error('Could not get trades from server');
            });
        }
    }]);

    return TradeService;
}();
//# sourceMappingURL=TradeService.js.map