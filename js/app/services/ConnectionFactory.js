var ConnectionFactory = (function () {

    var stores = ['trades'];
    var version = 3;
    var dbName = 'aluraFrame';
    
    var connection = null;
    
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
    }
})();