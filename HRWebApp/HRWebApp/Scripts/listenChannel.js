Pusher.logToConsole = true;

var pusher = new Pusher("658f3c8a3e5ef69474b1", {
    cluster: "ap1",
});

var channel = pusher.subscribe("IntegrationSystem");
channel.bind("both-created", function (data) {

    var tbody = document.getElementById("data");

    var newRow = tbody.insertRow(0); // Insert at the top of the table

    //const fullName =        "Hello world";
    //newRow.insertCell(0).innerText = data.sqlServerPersonal.City;
    //newRow.insertCell(1).innerText = data.sqlServerPersonal.City;
    //newRow.insertCell(2).innerText = data.sqlServerPersonal.Email;
    //newRow.insertCell(3).innerText = data.sqlServerPersonal.PhoneNumber;
    //newRow.insertCell(4).innerText = data.sqlServerPersonal.Gender == true ? "Male" : "Female";
    //newRow.insertCell(5).innerText = data.sqlServerPersonal.Shareholder;

    newRow.insertCell(0).innerText = "Hello world";
    newRow.insertCell(1).innerText = "Hello world";
    newRow.insertCell(2).innerText = "Hello world";
    newRow.insertCell(3).innerText = "Hello world";
    newRow.insertCell(4).innerText = "Hello world";
    newRow.insertCell(5).innerText = "Hello world";




    document.getElementById("fullName").textContent = "Hello world";
    $("#successModal").modal("show");
});
