//code ket noi pusher - channel cua minh o tren pusher

Pusher.logToConsole = true;

var pusher = new Pusher("658f3c8a3e5ef69474b1", {
    cluster: "ap1",
});

var channel = pusher.subscribe("IntegrationSystem");

// bind/listen du lieu xuong

channel.bind("HR-person-created", function (data) {
    console.log(data);
});

// su kien both-created
channel.bind("both-created", function (data) {
    var tbody = document.getElementById("data");

    var newRow = tbody.insertRow(0); // Insert at the top of the table

    newRow.insertCell(0).innerText = data.mongoDBemployee.EmployeeId;
    newRow.insertCell(1).innerText = data.mongoDBemployee.FirstName;
    newRow.insertCell(2).innerText = data.mongoDBemployee.LastName;
    newRow.insertCell(3).innerText = data.mongoDBemployee.VacationDays;
    newRow.insertCell(4).innerText = data.mongoDBemployee.PaidToDate;
    newRow.insertCell(5).innerText = data.mongoDBemployee.PaidLastYear;
    newRow.insertCell(6).innerText = data.mongoDBemployee.PayRate;
    newRow.insertCell(7).innerText = data.mongoDBemployee.PayRateID;
    newRow.insertCell(8).innerText = data.mongoDBemployee.CreatedAt;
    newRow.insertCell(9).innerText = data.mongoDBemployee.UpdatedAt;

    const fullName =
        data.mongoDBemployee.FirstName + " " + data.mongoDBemployee.LastName;
    document.getElementById("fullName").textContent = fullName;

    $("#successModal").modal("show");
});

channel.bind("both-edited", function (data) {
    document.getElementById("editID").textContent = data.mongoDBEmployeeId;
    $("#editSuccessfulModal").modal("show");
});

channel.bind("both-deleted", function (data) {
    document.getElementById("deleteID").textContent = data.mongoDBEmployeeId;
    $("#deleteSuccessfulModal").modal("show");
});
