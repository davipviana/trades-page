class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#date');
        this._inputAmount = $('#amount');
        this._inputValue = $('#value');
        this._tradeList = new TradeList();
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
        this._tradeListView.update(this._tradeList);
        this._messageView.update(this._message);
        this._clearForm();
    }

    clear() {
        this._tradeList.clear();
        this._tradeListView.update(this._tradeList);
        
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