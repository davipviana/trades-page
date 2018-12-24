class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#date');
        this._inputAmount = $('#amount');
        this._inputValue = $('#value');
    }

    add(event) {
        event.preventDefault();

        let trade = new Trade(
            DateHelper.textToDate(this._inputDate.value),
            this._inputAmount.value,
            this._inputValue.value
        )

        console.log(trade);
        console.log(DateHelper.dateToText(trade.date))
    }
}