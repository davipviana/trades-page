class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#date');
        this._inputAmount = $('#amount');
        this._inputValue = $('#value');
    }

    add(event) {
        event.preventDefault();

        let date = new Date(...
            this._inputDate.value
                .split('-')
                .map((item, index) => item - index % 2)
        )

        let trade = new Trade(
            date,
            this._inputAmount.value,
            this._inputValue.value
        )
    }
}