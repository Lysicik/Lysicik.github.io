import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAy_-YUMnW2Ng5y4Ba5vM9SYPNYOLtmu1Y",
    authDomain: "js-lab4.firebaseapp.com",
    databaseURL: "https://js-lab4.firebaseio.com",
    projectId: "js-lab4",
    storageBucket: "js-lab4.appspot.com",
    messagingSenderId: "427284355732",
    appId: "1:427284355732:web:fd4b138a0ee1226afbf281"
};
firebase.initializeApp(firebaseConfig);

export const onRegister = (login, password, email, file, resolve, reject) => {
    const ref = firebase.database().ref().child('users').child(login).child('Login');
    ref.on('value', snap => {
        const uploadTask = firebase.storage().ref('users/' + file.name).put(file);

        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, function (error) {
            console.log(error);

            return reject();
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (fileUrl) {
                firebase.database().ref('users/' + login).set({
                    email: email,
                    Login: login,
                    Password: password,
                    fileUrl: fileUrl
                }, function (error) {
                    if (error) {
                        return reject();
                    } else {
                        return resolve();
                    }
                });
                console.log('FILE URL: ', fileUrl);
            });
        });
    })
};

export const onLogin = (login, password, resolve, reject) => {
    const ref = firebase.database().ref().child('users').child(login).child('Password');
    ref.on('value', snap => {
        password === snap.val() ? resolve() : reject();
    })
};
