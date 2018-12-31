"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trade = function () {
    function Trade(date, amount, value) {
        _classCallCheck(this, Trade);

        this._date = new Date(date.getTime());
        this._amount = amount;
        this._value = value;
        Object.freeze(this);
    }

    _createClass(Trade, [{
        key: "volume",
        get: function get() {
            return this._amount * this._value;
        }
    }, {
        key: "date",
        get: function get() {
            return new Date(this._date.getTime());
        }
    }, {
        key: "amount",
        get: function get() {
            return this._amount;
        }
    }, {
        key: "value",
        get: function get() {
            return this._value;
        }
    }]);

    return Trade;
}();
//# sourceMappingURL=Trade.js.map