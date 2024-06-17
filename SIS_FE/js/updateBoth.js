document
    .getElementById("updateMergePerson")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = {
            SQL_Employee_ID: parseInt(
                document.getElementById("SQL_Employee_ID").value,
            ),
            mongoDBEmployeeId:
                document.getElementById("mongoDBEmployeeId").value == ""
                    ? null
                    : document.getElementById("mongoDBEmployeeId").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            vacationDays: parseInt(
                document.getElementById("vacationDays").value,
            ),
            paidToDate: parseInt(document.getElementById("paidToDate").value),
            paidLastYear: parseInt(
                document.getElementById("paidLastYear").value,
            ),
            payRate: parseFloat(document.getElementById("payRate").value),
            payRateId: parseInt(document.getElementById("payRateId").value),
            MiddleInitial: document.getElementById("MiddleInitial").value,
            Address1: document.getElementById("Address1").value,
            Address2: document.getElementById("Address2").value,
            City: document.getElementById("City").value,
            State: document.getElementById("State").value,
            Zip: parseInt(document.getElementById("Zip").value),
            Email: document.getElementById("Email").value,
            PhoneNumber: document.getElementById("PhoneNumber").value,
            SocialSecurityNumber: document.getElementById(
                "SocialSecurityNumber",
            ).value,
            DriversLicense: document.getElementById("DriversLicense").value,
            MaritalStatus: document.getElementById("MaritalStatus").value,
            Gender: document.getElementById("Gender").value === "True", // Convert to boolean
            Shareholder_Status:
                document.getElementById("Shareholder_Status").checked,
            BenefitPlans: parseInt(
                document.getElementById("BenefitPlans").value,
            ),
            Ethnicity: document.getElementById("Ethnicity").value,
        };

        // Create JSON string from form data
        const raw = JSON.stringify(formData);

        console.log(raw);

        // Configure request options
        const requestOptions = {
            method: "PATCH",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: raw,
            redirect: "follow",
        };

        console.log(requestOptions);

        fetch("http://localhost:8080/both", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((result) => {
                console.log(result); // Log the response

                alert("Sửa thành công");
            })
            .catch((error) => console.error("Error:", error));
    });

// Lấy query string từ URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Lấy dữ liệu từ query parameters
const dataString = urlParams.get("data");
const data = JSON.parse(dataString); // Chuyển đổi chuỗi JSON thành đối tượng JavaScript

console.log(data);

document.getElementById("SQL_Employee_ID").value = data.SQL_Employee_ID;
document.getElementById("mongoDBEmployeeId").value = data.mongoDBEmployeeId;
document.getElementById("firstName").value = data.firstName;
document.getElementById("lastName").value = data.lastName;
document.getElementById("vacationDays").value = data.vacationDays;
document.getElementById("paidToDate").value = data.paidToDate;
document.getElementById("paidLastYear").value = data.paidLastYear;
document.getElementById("payRate").value = data.payRate;
document.getElementById("payRateId").value = data.payRateId;
document.getElementById("MiddleInitial").value = data.MiddleInitial;
document.getElementById("Address1").value = data.Address1;
document.getElementById("Address2").value = data.Address2;
document.getElementById("City").value = data.City;
document.getElementById("State").value = data.State;
document.getElementById("Zip").value = data.Zip;
document.getElementById("Email").value = data.Email;
document.getElementById("PhoneNumber").value = data.PhoneNumber;
document.getElementById("SocialSecurityNumber").value =
    data.SocialSecurityNumber;
document.getElementById("DriversLicense").value = data.DriversLicense;
document.getElementById("MaritalStatus").value = data.MaritalStatus;
document.getElementById("Gender").value = data.Gender;
document.getElementById("Shareholder_Status").value = data.Shareholder_Status;
document.getElementById("BenefitPlans").value = data.BenefitPlans;
document.getElementById("Ethnicity").value = data.Ethnicity;
