import * as firebase from 'firebase';
import 'firebase/firestore';
import { resolve } from 'url';
import { reject } from 'q';


var firebaseConfig = {
    apiKey: "AIzaSyDsVezm3_JY5AqZcfRtVwyD9rJr3PQHkTw",
    authDomain: "chatapp-5b4c3.firebaseapp.com",
    databaseURL: "https://chatapp-5b4c3.firebaseio.com",
    projectId: "chatapp-5b4c3",
    storageBucket: "",
    messagingSenderId: "889286427982",
    appId: "1:889286427982:web:ff202cabcbb661e9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function funRegister(email, password) {
    return new Promise((resolve, reject) => {

        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            let userid = firebase.auth().currentUser.uid
            console.log(userid)
            db.collection('user').doc(user.user.uid).set({ email, userid, createdAt: Date.now() }).then(() => {
                resolve({ message: "Register successfully" })
            }).catch(e => {
                reject({ message: 'registration failed' })
            })

        })

    })
}
function funLogin(Email, Password) {

    firebase.auth().signInWithEmailAndPassword(Email, Password).then(user => {
        console.log(user)

    })

}
function getUser()
{
  return new Promise((resolve,reject)=>{
      db.collection('user').get().then(snapshot => {
          let arr=[];
          snapshot.forEach(snap => {
             arr.push({email:snap.data().email, id:snap.data().userid})
             
            })
            resolve(arr)
            
        })

    })
}
function createRoom(friendId) {
  
    const userId = firebase.auth().currentUser.uid;


    let chatExists = false;

    return new Promise((resolve, reject) => {
        //checking room
        db.collection('chatrooms')
        .where(`users.${friendId}`, '==', true)
        .where(`users.${userId}`, '==', true)
        .get().then(snapshot => {
            snapshot.forEach(elem => {
                // console.log("elem shareef=============>",elem.data());
                chatExists = { data: elem.data(), _id: elem.id };
            })
            
            if (!chatExists) {
                //creating room
                const obj = {
                    createdAt: Date.now(),
                    users: {
                        [friendId]: true,
                        [firebase.auth().currentUser.uid]: true
                    }
                }

                db.collection('chatrooms').add(obj).then((snapshot) => {
                    console.log("snapshootwali id=============>",snapshot.id)
                    resolve({ data: obj, _id: snapshot.id })
                })
            } else {
                resolve(chatExists);
            }
        })
    })
}
function getRoom(id)
{

return  new Promise(()=>{

    db.collection("chatrooms").get().then((snapshot)=>{
        snapshot.forEach((snap)=>{
            console.log("getrooomsnap=================>",snap.data())
            resolve(snap.data())
            
        })
        })
    })

}
function sendMessage(roomid,message) {   
    console.log("roooooooooooooooooooooooooommmms====>",roomid)
    return new Promise((resolve,reject=>{

        let obj=
        
        {
            message:message,
            currentUser:firebase.auth().currentUser.uid,
            timestamp:Date.now(),
            
            
        }
         db.collection("chatrooms").doc(roomid).collection("message").add(obj);
        resolve(obj)
    }))
}
function getAllMessages() {
    
       return new Promise((resolve,reject)=>{

           db.collection('message')
           .orderBy('timestamp').get().then((snapshot)=>{
            let message=[];  
            snapshot.forEach((snap=>{
                   let alldata=snap.data()
                   message.push(alldata)
                }))
                resolve(message);
                console.log("alldata==================>",resolve(message))          
                
            })
            
        }) 
        }

export {
    funRegister,
    funLogin,
    getUser,
    createRoom,
    getRoom,
    sendMessage,
    getAllMessages
}