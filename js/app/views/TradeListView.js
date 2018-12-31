'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TradeListView = function (_View) {
    _inherits(TradeListView, _View);

    function TradeListView() {
        _classCallCheck(this, TradeListView);

        return _possibleConstructorReturn(this, (TradeListView.__proto__ || Object.getPrototypeOf(TradeListView)).apply(this, arguments));
    }

    _createClass(TradeListView, [{
        key: 'template',
        value: function template(model) {
            return '\n        <table class="table table-hover table-bordered">\n            <thead>\n                <tr>\n                    <th>DATE</th>\n                    <th>AMOUNT</th>\n                    <th>VALUE</th>\n                    <th>VOLUME</th>\n                </tr>\n            </thead>\n            \n            <tbody>\n                ' + model.trades.map(function (t) {
                return '\n                            <tr>\n                                <td>' + DateHelper.dateToText(t.date) + '</td>\n                                <td>' + t.amount + '</td>\n                                <td>' + t.value + '</td>\n                                <td>' + t.volume + '</td>\n                            </tr>\n                        ';
            }).join('') + '\n            </tbody>\n            \n            <tfoot>\n                <td colspan="3"></td>\n                <td>' + model.trades.reduce(function (total, t) {
                return total + t.volume;
            }, 0.0) + '</td>\n            </tfoot>\n        </table>\n        ';
        }
    }]);

    return TradeListView;
}(View);
//# sourceMappingURL=TradeListView.js.map