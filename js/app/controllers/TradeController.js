class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#date');
        this._inputAmount = $('#amount');
        this._inputValue = $('#value');

        this._tradeList = new Bind(
            new TradeList(),
            new TradeListView($('#tradeListView')),
            'add', 'clear'
        );

        this._message = new Bind(
            new Message(),
            new MessageView($('#messageView')),
            'text'
        );
    }

    add(event) {
        event.preventDefault();

        this._tradeList.add(this._createNewTrade());
        this._message.text = "Trade created successfully";
        this._clearForm();
    }

    import() {
        let service = new TradeService();
        service.getWeekTrades((err, trades) => {
            if(err) {
                console.log(`Error: ${err}`);
                this._message.text = "Could not get trades from server";
                return;
            }

            trades.forEach(t => this._tradeList.add(t));
            this._message.text = "Trades imported successfully";
        });

        service.getLastWeekTrades((err, trades) => {
            if(err) {
                console.log(`Error: ${err}`);
                this._message.text = "Could not get trades from server";
                return;
            }

            trades.forEach(t => this._tradeList.add(t));
            this._message.text = "Trades imported successfully";
        });

        service.getTwoWeeksAgoTrades((err, trades) => {
            if(err) {
                console.log(`Error: ${err}`);
                this._message.text = "Could not get trades from server";
                return;
            }

            trades.forEach(t => this._tradeList.add(t));
            this._message.text = "Trades imported successfully";
        });
    }

    clear() {
        this._message.text = "All trades removed successfully";
        this._tradeList.clear();
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