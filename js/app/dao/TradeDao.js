'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TradeDao = function () {
    function TradeDao(connection) {
        _classCallCheck(this, TradeDao);

        this._connection = connection;
        this._store = 'trades';
    }

    _createClass(TradeDao, [{
        key: 'add',
        value: function add(trade) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(trade);

                request.onsuccess = function (e) {
                    return resolve();
                };
                request.onerror = function (e) {
                    return reject(e.target.error);
                };
            });
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var cursor = _this2._connection.transaction([_this2._store], 'readonly').objectStore(_this2._store).openCursor();

                var trades = [];
                cursor.onsuccess = function (e) {
                    var current = e.target.result;
                    if (current) {
                        var trade = current.value;
                        trades.push(new Trade(trade._date, trade._amount, trade._value));

                        current.continue();
                    } else {
                        resolve(trades);
                    }
                };

                cursor.onerror = function (e) {
                    reject(e.target.error);
                };
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                request.onsuccess = function (e) {
                    return resolve();
                };
                request.onerror = function (e) {
                    return reject(e);
                };
            });
        }
    }]);

    return TradeDao;
}();
//# sourceMappingURL=TradeDao.js.map