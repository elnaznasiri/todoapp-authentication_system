//view
//show information
//build html
var view = (function () {
    const typeBox = document.getElementById('textbox');
    //const todoList = document.getElementById("list");
    const ulElement = document.getElementById('ul-todo-list');
    var btnSignin = document.getElementById('btnSignin');
    var btnSignout = document.getElementById('btnSignout');
    var loginPage = document.getElementById('id01');
    var spnUserDisplayName = document.getElementById('spnUserDisplayName');
    var usernameInput = document.getElementById('modal-username');
    var passwordInput = document.getElementById('modal-password');
    var downloadButton = document.getElementById('downloadButton');
    var uploadButton = document.getElementById('uploadButton');
    var appPage = document.getElementById('app');
    var signupPage = document.getElementById('signup-page');
    var btnSignup = document.getElementById('btnSignup');
    var fisrtnameSignup = document.getElementById('fisrtnameSignup');
    var lastnameSignup = document.getElementById('lastnameSignup');
    var usernameSignup = document.getElementById('usernameSignup');
    var passwordSignup = document.getElementById('passwordSignup');

    addbutton.onclick = add;
    typeBox.onkeypress = function (e) {
        if (e.key === 'Enter') {
            add();
        }
    };

    return {
        render: render,
        add: add,
        deleteAll: deleteAll,
        filter: filter,
        download: download,
        upload: upload,
        login: login,
        showApp: showApp,
        showLoginPage: showLoginPage,
        logoff: logoff,
        cancelLogin: cancelLogin,
        showRegisterPage: showRegisterPage,
        register: register,
        cancelRegister: cancelRegister,
    };

    function render(notes, filter) {
        ulElement.innerHTML = "";
        notes.forEach(note => {
            createLi(note);
        });
        //color of selected filter
        document.getElementById("f0").classList.remove("selected-filter");
        document.getElementById("f1").classList.remove("selected-filter");
        document.getElementById("f2").classList.remove("selected-filter");
        document.getElementById("f" + filter).classList.add("selected-filter");
    }

    function filter(value) {
        controller.setFilter(value);
    }

    function add() {
        var value = typeBox.value;
        if (!value) return;
        controller.addItem(value);
        typeBox.value = '';
    }

    function deleteAll() {
        controller.deleteAll();
    }

    function download() {
        controller.download();
    }

    function upload() {
        controller.upload();
    }

    function login() {
        var username = usernameInput.value;
        var password = passwordInput.value;
        if (!username || !password) return;

        controller.login(username, password);
        usernameInput.value = '';
        passwordInput.value = '';
    }

    function register() {
        var fisrtname = fisrtnameSignup.value;
        var lastname = lastnameSignup.value;
        var username = usernameSignup.value;
        var password = passwordSignup.value;
        if (!fisrtname || !lastname || !username || !password) return;

        controller.register(fisrtname, lastname, username, password);
        fisrtnameSignup.value = '';
        lastnameSignup.value = '';
        usernameSignup.value = '';
        passwordSignup.value = '';
    }

    function createLi(note) {
        var li = document.createElement('li');
        var span = document.createElement('span');
        var btnDel = document.createElement('img');
        var btnToggleDone = document.createElement('img');
        span.appendChild(document.createTextNode(note.title));
        li.appendChild(span);
        li.appendChild(btnDel);
        li.appendChild(btnToggleDone);
        ulElement.appendChild(li);

        btnToggleDone.onclick = function () {
            controller.toggleDone(note);
        }
        if (note.done) {
            btnToggleDone.src = "done.jpg";
        } else {
            btnToggleDone.src = "notdone.jpg";
        }

        btnDel.onclick = function () {
            controller.deleteItem(note);
        }
        btnDel.src = "delete.jpg";
    }

    function showLoginPage() {
        appPage.style.display = 'none';
        spnUserDisplayName.style.display = 'none';
        loginPage.style.display = 'block';
        btnSignin.style.display = 'none';
        btnSignout.style.display = 'none';
        btnSignup.style.display = 'block';
    }

    function showRegisterPage() {
        appPage.style.display = 'none';
        spnUserDisplayName.style.display = 'none';
        signupPage.style.display = 'block';
        btnSignin.style.display = 'none';
        btnSignout.style.display = 'none';
        btnSignup.style.display = 'none';
    }

    function showApp(user) {
        loginPage.style.display = 'none';
        signupPage.style.display = 'none';
        appPage.style.display = 'block';
        spnUserDisplayName.style.display = 'inline-block';

        if (user && user.id) {
            btnSignup.style.display = 'none';
            btnSignin.style.display = 'none';
            btnSignout.style.display = 'inline-block';
            spnUserDisplayName.textContent = user.firstName + ' ' + user.lastName;
            downloadButton.style.display = 'inline-block';
            uploadButton.style.display = 'inline-block';
        } else {
            btnSignup.style.display = 'block';
            btnSignin.style.display = 'block';
            btnSignout.style.display = 'none';
            spnUserDisplayName.textContent = 'anonymous user';
            downloadButton.style.display = 'none';
            uploadButton.style.display = 'none';
        }
    };

    function logoff() {
        controller.logoff();
    }

    function cancelLogin() {
        showApp();
    }

    function cancelRegister() {
        showApp();
    }

}());