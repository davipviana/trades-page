class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#date');
        this._inputAmount = $('#amount');
        this._inputValue = $('#value');
        this._tradeList = new TradeList();
        this._tradeListView = new TradeListView($('#tradeListView'));

        this._tradeListView.update(this._tradeList);
    }

    add(event) {
        event.preventDefault();

        this._tradeList.add(this._createNewTrade());
        this._tradeListView.update(this._tradeList);
        this._clearForm();
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