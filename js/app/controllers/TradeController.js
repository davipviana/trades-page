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

        this._tradeService = new TradeService();

        this._init();
    }

    _init() {
        this._tradeService
            .getAll()
            .then(trades => trades.forEach(t => this._tradeList.add(t)))
            .catch(() => this._message.text = "Could not get trades");

        setInterval(() => {
            this.import();
        }, 5000);
    }

    add(event) {
        event.preventDefault();

        let newTrade = this._createNewTrade();
        this._tradeService
            .add(newTrade)
            .then(message => {
                this._tradeList.add(newTrade);
                this._message.text = message;
                this._clearForm();
            })
            .catch(err => this._message.text = err);
    }

    import() {
        Promise.all([
            this._tradeService.getWeekTrades(),
            this._tradeService.getLastWeekTrades(),
            this._tradeService.getTwoWeeksAgoTrades() 
        ])
        .then(trades =>
            trades
                .reduce((resultArray, array) => resultArray.concat(array), [])
                .filter(t =>
                !this._tradeList.trades.some(t2 =>
                    JSON.stringify(t) == JSON.stringify(t2)))
        )
        .then(trades => {
            trades
                .forEach(t => this._tradeList.add(t));
            this._message.text = "Trades imported successfully";
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            this._message.text = "Could not get trades from server";
        });
    }

    clear() {
        this._tradeService
            .clear()
            .then(() => {
                this._message.text = "All trades removed successfully";
                this._tradeList.clear();
            })
            .catch(e => this._message.text = "Could not remove all trades");
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