const API = require('./mock-api');
const EventEmitter = require('events');

class Search extends EventEmitter {
    searchCount(term) {
        if (!term) {
            this.emit('SEARCH_ERROR', new Error('INVALID_TERM'));
            return;
        }
        // Emitir el evento SEARCH_STARTED cuando la búsqueda comience
        this.emit('SEARCH_STARTED', term);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simula una falla de API si el término es 'error'
                if (term === 'error') {
                    this.emit('SEARCH_ERROR', { term, message: 'CONNECTION_ERROR' });
                    reject(new Error('CONNECTION_ERROR'));
                    return;
                }

                // Simula una búsqueda exitosa para otros términos
                const count = Math.floor(Math.random() * 100);
                this.emit('SEARCH_SUCCESS', { term, count });
                resolve({ term, count });
            }, 100); // Ajusta el tiempo de espera si es necesario
        });
    }
}

module.exports = Search;
