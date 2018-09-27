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

      database.ref("/schedule").push(tData);
  })

  $("#input-clear").on("click", function(event) {
    event.preventDefault();
    database.ref("/schedule").set({
        empty: null
    });
    $("#table-body").empty();
})

  database.ref("/schedule").on("child_added", function(snap) {
        // Create table elements.
        var tableBody = $("#table-body");
        var row = $("<tr>");
        
        // Grab from database.
        var tFreq = snap.val().freq;
        var tTime = snap.val().time;
        
        // Calculate
        var tTimeConverted = moment(tTime, "HH:mm").subtract(1, "years");
        var timeDiff = moment().diff(moment(tTimeConverted), "minutes");
        var timeRemainder = timeDiff % tFreq;
        var timeUntilTrain = tFreq - timeRemainder;
        var timeNextArrival = moment().add(timeUntilTrain, "minutes").format("hh:mm");
        
        // Display in table.
        var tDisplayName = $("<th>").text(snap.val().name);
        var tDisplayDestination = $("<td>").text(snap.val().dest);
        var tDisplayFrequency = $("<td>").text(tFreq);
        var tDisplayNextArrival = $("<td>").text(timeNextArrival);
        var tDisplayMinutesAway = $("<td>").text(timeUntilTrain);

        // Append everything
        row.append(tDisplayName, tDisplayDestination, tDisplayFrequency, tDisplayNextArrival, tDisplayMinutesAway);
        tableBody.append(row);
  })

