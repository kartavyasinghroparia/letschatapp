//YOUR FIRE BASE LINKS
const firebaseConfig = {
    apiKey: "AIzaSyAon1QmmyWkbUBzTTw5Wrm9M_vQt1ssGkU",
    authDomain: "kwitter-b285b.firebaseapp.com",
    databaseURL: "https://kwitter-b285b-default-rtdb.firebaseio.com",
    projectId: "kwitter-b285b",
    storageBucket: "kwitter-b285b.appspot.com",
    messagingSenderId: "673777192900",
    appId: "1:673777192900:web:e4487d5d034e83bf1dde91"
  };
  firebase.initializeApp(firebaseConfig);
    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");
  
  function send()
  {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
     });
  
    document.getElementById("msg").value = "";
  }
  function uploadImage() {
    const file = document.getElementById("fileInput").files[0];
    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child("images/" + file.name);
    imagesRef.put(file);
  
    imagesRef.getDownloadURL().then((url) => {
      firebase.database().ref("images").push({
        imageUrl: url
      });
    });
  }
  
  firebase.database().ref("images").on("child_added", (snapshot) => {
    const image = snapshot.val();
    const imageElement = document.createElement("img");
    imageElement.src = image.imageUrl;
    document.body.appendChild(imageElement);
  
  
    
  });
  
  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
           firebase_message_id = childKey;
           message_data = childData;
  //Start code
           console.log(firebase_message_id);
           console.log(message_data);
           name = message_data['name'];
           message = message_data['message'];
           like = message_data['like'];
           name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
           message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
  like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
           span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
  
          row = name_with_tag + message_with_tag +like_button + span_with_tag;       
          document.getElementById("output").innerHTML += row;
  //End code
        } });  }); }
  getData();
  
  function updateLike(message_id)
  {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
  
    firebase.database().ref(room_name).child(message_id).update({
      like : updated_likes  
     });
  
  }
  
  function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("kwitter.html");
  }
  