var connection = (function () {
    return {
        init: init,
        download: download,
        upload: upload,
        authenticate: authenticate,
        signout: signout,
        registerUser: registerUser
    };

    function init(userId) {
        setTokenHeader(userId);
    }

    function registerUser(fisrtname, lastname, username, password, cb, err) {
        var data = {
            "username": username,
            "password": password,
            "firstName": fisrtname,
            "lastName": lastname
        }
        http.post('register', JSON.stringify(data), [{ name: 'Content-Type', value: 'application/json' }], function (result) {
            if (result) {
                var user = JSON.parse(result);
                setTokenHeader(user.id);
            }
            cb && cb(user);
        }, err);
    }
    function authenticate(username, password, cb, err) {
        var headers = [
            { name: 'Content-Type', value: 'application/json' },
            { name: 'username', value: username },
            { name: 'password', value: password }
        ];
        http.post('auth', null, headers, function (result) {
            if (result) {
                var user = JSON.parse(result);

                setTokenHeader(user.id);
            }
            cb && cb(user);
        }, err); // vaghti login eshtebah mishe server 404 mide va err seda zadeh mishe
    }

    function download(cb, err) {
        http.get('read', [], cb, err);
    }

    function upload(data, cb, err) {
        http.post('write', JSON.stringify(data), [{ name: 'Content-Type', value: 'application/json' }], cb, err);
    }

    function signout() {
        setTokenHeader(0);
    }
    // ========================================================================================================================
    function setTokenHeader(token) {
        http.setDefaultHeader('token', token);
    }
}())