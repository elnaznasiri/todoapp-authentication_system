var dataBase = (function () {
    var MODEL_KEY = 'MODEL';
    USER_KEY = 'USER';

    return {
        getModel: getModel,
        setModel: setModel,
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser,
    };

    function getModel(userId) {
        var allModels = JSON.parse(localStorage.getItem(MODEL_KEY) || '{}');
        var value = allModels[userId];
        return value;
    };

    function setModel(userId, value) {
        !value && (value = {});
        var allModels = JSON.parse(localStorage.getItem(MODEL_KEY) || '{}');
        allModels[userId] = value;
        localStorage.setItem(MODEL_KEY, JSON.stringify(allModels));
    };

    function getCurrentUser() {
        var user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : user;
    }

    function setCurrentUser(user) {
        return localStorage[user ? 'setItem' : 'removeItem'](USER_KEY, JSON.stringify(user));
    }

}())