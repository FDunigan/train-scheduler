var config = {
    apiKey: "AIzaSyBK_WB0pZyZibE2gRr9cFrrQoj1bY4no04",
    authDomain: "fantastic-c2a1c.firebaseapp.com",
    databaseURL: "https://fantastic-c2a1c.firebaseio.com",
    projectId: "fantastic-c2a1c",
    storageBucket: "fantastic-c2a1c.appspot.com",
    messagingSenderId: "619625267114"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#train-destination-input").val().trim();
    var firstTrainTime = moment($("#first-train-time-input").val().trim(), "hh:mm").format("X");
    var tFrequency = $("#frequency-input").val().trim();
  
    var newTrain = {
      name: trainName,
      destination: trainDest,
      first: firstTrainTime,
      frequency: tFrequency
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);
  
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().first;
    var tFrequency = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrainTime);
    console.log(tFrequency);
  
    var firstTrainTimePretty = moment.unix(firstTrainTime).format("hh:mm");
  
    var tFrequency = childSnapshot.val().frequency;

    var firstTrainTime = "03:30";
    
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    var newRow = $("<tr>").append(
      $("<th>").text(trainName),
      $("<th>").text(trainDest),
      $("<th>").text(tFrequency),
      $("<th>").text(nextTrain),
      $("<th>").text(tMinutesTillTrain)
    );

    $("#train-table > tbody").append(newRow);
  });