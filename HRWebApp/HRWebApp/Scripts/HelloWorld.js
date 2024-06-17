Pusher.logToConsole = true;

var pusher = new Pusher("658f3c8a3e5ef69474b1", {
    cluster: "ap1",
});

var channel = pusher.subscribe("IntegrationSystem");
channel.bind("both-created", function (data) {

    var tbody = document.getElementById("data");

    var newRow = tbody.insertRow(0); // Insert at the top of the table

    const fullName = data.sqlServerPersonal.First_Name + " " + data.sqlServerPersonal.Last_Name;
    newRow.insertCell(0).innerText = fullName;
    newRow.insertCell(1).innerText = data.sqlServerPersonal.City;
    newRow.insertCell(2).innerText = data.sqlServerPersonal.Email;
    newRow.insertCell(3).innerText = data.sqlServerPersonal.PhoneNumber;
    newRow.insertCell(4).innerText = data.sqlServerPersonal.Gender == true ? "Male" : "Female";
    newRow.insertCell(5).innerText = data.sqlServerPersonal.Shareholder;




    document.getElementById("fullName").textContent = fullName;
    $("#successModal").modal("show");
});

channel.bind("both-edited", function (data) {
    document.getElementById("editID").textContent = data.SQL_Employee_ID;
    $("#editSuccessfulModal").modal("show");
});

channel.bind("both-deleted", function (data) {  
    document.getElementById("deleteID").textContent = data.SQL_Employee_ID;
    $("#deleteSuccessfulModal").modal("show");
});