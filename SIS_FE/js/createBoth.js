document
    .getElementById("createMergePerson")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = {
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

        // Configure request options
        const requestOptions = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: raw,
            redirect: "follow",
        };

        // Send POST request
        // Send POST request
        fetch("http://localhost:8080/both", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((result) => {
                console.log(result); // Log the response

                alert("Thêm mới thành công");
            })
            .catch((error) => console.error("Error:", error));
    });
