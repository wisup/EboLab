window.fakeStorage = {
    _data: {},

    setItem: function(id, val) {
        return this._data[id] = String(val);
    },

    getItem: function(id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },

    removeItem: function(id) {
        return delete this._data[id];
    },

    clear: function() {
        return this._data = {};
    }
};

//VAR LIST------
//bestScoreKey
//gameStateKey
//noticeClosedKey
//storage
//
//FUNCTION LIST--------
//LocalStorageManager
//
//localStorageSupported  : Check if local storage is supported by the device
//getBestScore           : Get the best score
//setBestScore           : Set the best score
//getGameState           : Get the game state
//setGameState           : Set the game state
//clearGameState         : Clear the game state
//setNoticeClosed        : Set if the notice was closed
//getNoticeClosed        : Get if the notice was closed

function LocalStorageManager() {
    this.bestScoreKey = "generalGameState";
    this.gameStateKey = "actualGameState";

    var supported = this.localStorageSupported();
    this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function() {
    var testKey = "test";
    var storage = window.localStorage;

    try {
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function() {
    return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function(score) {
    this.storage.setItem(this.bestScoreKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function() {
    var stateJSON = this.storage.getItem(this.gameStateKey);
    return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.
 = function(gameState) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function() {
    this.storage.removeItem(this.gameStateKey);
};

LocalStorageManager.prototype.setNoticeClosed = function(noticeClosed) {
    this.storage.setItem(this.noticeClosedKey, JSON.stringify(noticeClosed));
};

LocalStorageManager.prototype.getNoticeClosed = function() {
    return JSON.parse(this.storage.getItem(this.noticeClosedKey) || "false");
};