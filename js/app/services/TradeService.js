class TradeService {
    getWeekTrades(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/negociacoes/semana');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    callback(
                        null,
                        JSON.parse(xhr.responseText)
                        .map((obj) => new Trade(new Date(obj.data), obj.quantidade, obj.valor))
                    );    
                } else {
                    callback(xhr.responseText, null);
                }
            }
        };
        xhr.send();
    }

    getLastWeekTrades(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/negociacoes/anterior');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    callback(
                        null,
                        JSON.parse(xhr.responseText)
                        .map((obj) => new Trade(new Date(obj.data), obj.quantidade, obj.valor))
                    );    
                } else {
                    callback(xhr.responseText, null);
                }
            }
        };
        xhr.send();
    }

    getTwoWeeksAgoTrades(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/negociacoes/retrasada');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    callback(
                        null,
                        JSON.parse(xhr.responseText)
                        .map((obj) => new Trade(new Date(obj.data), obj.quantidade, obj.valor))
                    );    
                } else {
                    callback(xhr.responseText, null);
                }
            }
        };
        xhr.send();
    }
}