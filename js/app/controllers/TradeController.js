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

        ConnectionFactory
            .getConnection()
            .then(conn => new TradeDao(conn))
            .then(dao => dao.getAll())
            .then(trades => trades.forEach(t => this._tradeList.add(t)));
    }

    add(event) {
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(conn => {
                let newTrade = this._createNewTrade();
                new TradeDao(conn)
                    .add(newTrade)
                    .then(() => {
                        this._tradeList.add(newTrade);
                        this._message.text = "Trade created successfully";
                        this._clearForm();
                    });
            })
            .catch(error => this._message.text = error);
    }

    import() {
        let service = new TradeService();
        Promise.all([
            service.getWeekTrades(),
            service.getLastWeekTrades(),
            service.getTwoWeeksAgoTrades() 
        ]).then(trades => {
            trades
                .reduce((resultArray, array) => resultArray.concat(array), [])
                .forEach(t => this._tradeList.add(t));
            this._message.text = "Trades imported successfully";
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            this._message.text = "Could not get trades from server";
        });
    }

    clear() {
        this._message.text = "All trades removed successfully";
        this._tradeList.clear();
    }

    _createNewTrade() {
        return new Trade(
            DateHelper.textToDate(this._inputDate.value),
            parseInt(this._inputAmount.value),
            parseFloat(this._inputValue.value)
        )
    }

    _clearForm() {
        this._inputDate.value = '';
        this._inputAmount.value = 1;
        this._inputValue.value = 0;

        this._inputDate.focus();
    }
}