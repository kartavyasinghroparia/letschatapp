//ADD YOUR FIREBASE LINKS
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
  
  document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";
  
  function addRoom()
  {
    room_name = document.getElementById("room_name").value;
  
    firebase.database().ref("/").child(room_name).update({
      purpose : "adding room name"
    });
  
      localStorage.setItem("room_name", room_name);
      
      window.location = "kwitter_page.html";
  }
  
  function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
         Room_names = childKey;
         console.log("Room Name - " + Room_names);
        row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
  
  }
  
  getData();
  
  function redirectToRoomName(name)
  {
    console.log(name);
    localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
  }
  
  function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
      window.location = "kwitter.html";
  }
  