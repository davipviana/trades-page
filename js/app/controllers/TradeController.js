'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TradeController = function () {
    function TradeController() {
        _classCallCheck(this, TradeController);

        var $ = document.querySelector.bind(document);
        this._inputDate = $('#date');
        this._inputAmount = $('#amount');
        this._inputValue = $('#value');

        this._tradeList = new Bind(new TradeList(), new TradeListView($('#tradeListView')), 'add', 'clear');

        this._message = new Bind(new Message(), new MessageView($('#messageView')), 'text');

        this._tradeService = new TradeService();

        this._init();
    }

    _createClass(TradeController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._tradeService.getAll().then(function (trades) {
                return trades.forEach(function (t) {
                    return _this._tradeList.add(t);
                });
            }).catch(function () {
                return _this._message.text = "Could not get trades";
            });

            setInterval(function () {
                _this.import();
            }, 5000);
        }
    }, {
        key: 'add',
        value: function add(event) {
            var _this2 = this;

            event.preventDefault();

            var newTrade = this._createNewTrade();
            this._tradeService.add(newTrade).then(function (message) {
                _this2._tradeList.add(newTrade);
                _this2._message.text = message;
                _this2._clearForm();
            }).catch(function (err) {
                return _this2._message.text = err;
            });
        }
    }, {
        key: 'import',
        value: function _import() {
            var _this3 = this;

            this._tradeService.import(this._tradeList.trades).then(function (trades) {
                trades.forEach(function (t) {
                    return _this3._tradeList.add(t);
                });
                _this3._message.text = "Trades imported successfully";
            }).catch(function (err) {
                return _this3._message.text = "Could not get trades from server";
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            var _this4 = this;

            this._tradeService.clear().then(function () {
                _this4._message.text = "All trades removed successfully";
                _this4._tradeList.clear();
            }).catch(function (e) {
                return _this4._message.text = "Could not remove all trades";
            });
        }
    }, {
        key: '_createNewTrade',
        value: function _createNewTrade() {
            return new Trade(DateHelper.textToDate(this._inputDate.value), parseInt(this._inputAmount.value), parseFloat(this._inputValue.value));
        }
    }, {
        key: '_clearForm',
        value: function _clearForm() {
            this._inputDate.value = '';
            this._inputAmount.value = 1;
            this._inputValue.value = 0;

            this._inputDate.focus();
        }
    }]);

    return TradeController;
}();
//# sourceMappingURL=TradeController.js.map