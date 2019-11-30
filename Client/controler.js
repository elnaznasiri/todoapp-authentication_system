//model
var controller = (function () {
    var _notes = [];
    var _todoListFilter = 0; // 0:all    1:active     2:completed
    var _currentUser = {}; //no local

    //contoroler
    //logic
    init();

    return {
        addItem: addItem,
        deleteAll: deleteAll,
        deleteItem: deleteItem,
        toggleDone: toggleDone,
        getFilteredNotes: getFilteredNotes,
        setFilter: setFilter,
        getFilter: getFilter,
        download: download,
        upload: upload,
        login: login,
        logoff: logoff,
        register: register
    };


    function addItem(value) {
        _notes.push({ title: value, done: false });
        renderList();
    }

    function deleteAll() {
        _notes = [];
        renderList();
    }

    function deleteItem(note) {
        _notes.splice(_notes.indexOf(note), 1);
        renderList();
    }

    function toggleDone(note) {
        note.done = !note.done;
        renderList();
    }

    function getFilteredNotes() { //which one select
        if (_todoListFilter == 1) {
            return _notes.filter(function (note) { //kole list note
                return !note.done;
            });
        }
        if (_todoListFilter == 2) {
            return _notes.filter(function (note) {
                return note.done;
            });
        }

        return _notes;
    }

    function getFilter() {
        return _todoListFilter;
    }

    function setFilter(value) {
        _todoListFilter = value;
        renderList();
    }


    // =================================================================
    function download() {
        connection.download(function (data) {
            if (!data) return alert('there is nothing on the server to replace client data.');
            var confirmResult = confirm('data on the local storage will be repaced!, are you sure to continue?');
            if (!confirmResult) return;
            model = JSON.parse(data);
            dataBase.setModel(_currentUser.id, { notes: model.notes, filter: model.filter });
            init();
        }, function (err) {
            alert(err);
        });
    }

    function upload() {
        var data = dataBase.getModel(_currentUser.id);
        console.log('data to upload is :' + data);
        if (!data) return alert('there is nothing to upload.');
        var confirmResult = confirm('data on the server will be replaced!, are you sure to continue?');
        if (!confirmResult) return;
        connection.upload(data, function () {
            alert('upload done successfully.');
        }, function () {
            alert('upload failed !!!');
        });
    }



    function login(username, password) {
        connection.authenticate(username, password, function (user) {
            if (!user) {
                return alert('authentication failed.');
            }
            dataBase.setCurrentUser(user);
            init();
        }, function (err) {
            alert('Error: ' + err);
        });
    }

    function register(fisrtname, lastname, username, password) {
        connection.registerUser(fisrtname, lastname, username, password, function (user) {
            if (!user) {
                return alert('register failed.');
            }
            alert('register done successfuly for  ' + user.firstName + ' ' + user.lastName);
            dataBase.setCurrentUser(user);
            init();
        }, function (err) {
            alert(err);
        });
    }

    function logoff() {
        dataBase.setCurrentUser();
        connection.signout();
        init();
    }

    // ===================================================================================================
    //local storage
    function init() {
        _currentUser = dataBase.getCurrentUser() || { id: 0 };
        connection.init(_currentUser.id);
        view.showApp(_currentUser);
        var model = dataBase.getModel(_currentUser.id) || {};
        _notes = model.notes || [];
        _todoListFilter = model.filter || 0;
        renderList();
    }

    function renderList() {
        dataBase.setModel(_currentUser.id, { notes: _notes, filter: _todoListFilter });
        view.render(getFilteredNotes(), _todoListFilter);
    }

}());

