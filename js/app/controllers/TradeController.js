class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#date');
        this._inputAmount = $('#amount');
        this._inputValue = $('#value');
        let self = this;
        this._tradeList = new Proxy(new TradeList(), {

            get(target, prop, receiver) {
                if(['add', 'clear'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                    return function() {
                        Reflect.apply(target[prop], target, arguments);
                        self._tradeListView.update(target);
                    }

                }
                return Reflect.get(target, prop, receiver);
            }

        });

        this._tradeListView = new TradeListView($('#tradeListView'));
        this._messageView = new MessageView($('#messageView'));
        this._message = new Message();

        this._tradeListView.update(this._tradeList);
        this._messageView.update(this._message);
    }

    add(event) {
        event.preventDefault();

        this._tradeList.add(this._createNewTrade());
        this._message.text = "Trade created successfully";
        
        this._messageView.update(this._message);
        this._clearForm();
    }

    clear() {
        this._tradeList.clear();
        
        this._message.text = "All trades removed successfully";
        this._messageView.update(this._message);
    }

    _createNewTrade() {
        return new Trade(
            DateHelper.textToDate(this._inputDate.value),
            this._inputAmount.value,
            this._inputValue.value
        )
    }

    _clearForm() {
        this._inputDate.value = '';
        this._inputAmount.value = 1;
        this._inputValue.value = 0;

        this._inputDate.focus();
    }
}