class TradeService {
    getWeekTrades() {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/negociacoes/semana');
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(
                            JSON.parse(xhr.responseText)
                                .map((obj) => new Trade(new Date(obj.data), obj.quantidade, obj.valor))
                        );    
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });

    }

    getLastWeekTrades() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/negociacoes/anterior');
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(
                            JSON.parse(xhr.responseText)
                                .map((obj) => new Trade(new Date(obj.data), obj.quantidade, obj.valor))
                        );    
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }

    getTwoWeeksAgoTrades() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/negociacoes/retrasada');
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(
                            JSON.parse(xhr.responseText)
                                .map((obj) => new Trade(new Date(obj.data), obj.quantidade, obj.valor))
                        );    
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }
}