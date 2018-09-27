  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAqBXnDyVXDLs-Aj7DpiM6sUguUg2Lg5cM",
    authDomain: "train-schedule-a66b1.firebaseapp.com",
    databaseURL: "https://train-schedule-a66b1.firebaseio.com",
    projectId: "train-schedule-a66b1",
    storageBucket: "train-schedule-a66b1.appspot.com",
    messagingSenderId: "60528118448"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // on click of submit, grab inputs and push to database.

  // listener, on change of child pull data and use data to do calculations
  // then push to display.

  $("#input-submit").on("click", function(event) {
      event.preventDefault();

      tData = {
          name: $("#name-input").val(),
          dest: $("#dest-input").val(),
          time: $("#time-input").val(),
          freq: $("#freq-input").val()
      }

      database.ref().push(tData);
  })

  database.ref().on("child_added", function(snap) {
      console.log(snap.val());
  })