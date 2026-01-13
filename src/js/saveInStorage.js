
export default class SaveInStorage {
    constructor(storage) {
        this.storage = storage;
    }

    setInStorage (obj) {
        this.storage.setItem('listState', JSON.stringify(obj))
    }

    getFromStorage () {
        try {
            return JSON.parse(this.storage.getItem('listState'));
        } catch (error) {
            throw new Error('Invalid state');
        }
    }
}
