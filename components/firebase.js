import firebase from 'firebase';
class Firebase {
    constructor() {
        this.init();
        this.observeAuth();
    }
    init = () => {
        
    }
    observeAuth = () => {
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }
    onAuthStateChanged = (user) => {
        if(!user) {
            try {
                firebase.auth().signInAnonymously();
            }
            catch(message) {
                alert(message);
            }
        }
    }
    get uid() {
        return (firebase.auth().currentUser.uid || {}.uid);
    }
    get ref() {
        return (firebase.database().ref('messages'));
    }
    parse = snapshot => {
        const {timestamp: numberStamp, text, user} = snapshot.val();
        const {key: _id} = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user
        };
        return message;
    };
    on = cb => {
        this.ref
        .limitToLast(50)
        .on('child_added', snapshot => {
            cb(this.parse(snapshot))
        })
    }
    get timestamp() {
        return firebase.database.serverValue.TIMESTAMP;
    }
    send = messages => {
        for(let i=0;i<messages.length;i++) {
            const {text, user} = messages[i];
            const message = {
                text,user,
                timestamp: this.timestamp
            };
            this.append(message);
        }
    };
    append = message => {
        this.ref().push(message);
    }
    off() {
        this.ref.off();
    }
}
firebase.shared = new Firebase()
export default firebase;