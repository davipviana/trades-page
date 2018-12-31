"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TradeList = function () {
    function TradeList() {
        _classCallCheck(this, TradeList);

        this._trades = [];
    }

    _createClass(TradeList, [{
        key: "add",
        value: function add(trade) {
            this._trades.push(trade);
        }
    }, {
        key: "clear",
        value: function clear() {
            this._trades = [];
        }
    }, {
        key: "trades",
        get: function get() {
            return [].concat(this._trades);
        }
    }]);

    return TradeList;
}();
//# sourceMappingURL=TradeList.js.map