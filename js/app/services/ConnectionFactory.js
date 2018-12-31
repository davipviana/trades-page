var ConnectionFactory = (function () {

    const stores = ['trades'];
    const version = 3;
    const dbName = 'aluraFrame';
    
    var connection = null;
    var close = null;
    
    return class ConnectionFactory {
    
        constructor() {
            throw new Error('ConnectionFactory can not be instantiated');
        }
    
        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);
    
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };
                
                openRequest.onsuccess = e => {
                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error('Connection can not be closed directly');
                        }
                    }
                    resolve(connection);
                };
                
                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error);
                };
            });
        }
        
        static _createStores(connection) {
            stores.forEach(store => {
                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
        
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection() {
            if(connection) {
                close();
                connection = null;
            }
        }
    }
})();