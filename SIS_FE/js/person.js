export const findAll = async (pageNumber, pageSize) => {
    try {
        let response = await axios.get(
            `http://localhost:8080/merge-person?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        );
        return response.data; // Access the array in the 'data' property of the 'data' object
    } catch (e) {
        console.log(e);
    }
};

const fetchDataAndAddToTable = async (pageNumber, pageSize) => {
    const data = await findAll(pageNumber, pageSize);

    const currentPersonsElement = document.getElementById("current-persons");
    const totalSizeElement = document.getElementById("total-size");

    currentPersonsElement.innerText = `${(pageNumber - 1) * 10 + 1} - ${
        pageNumber * 10 + 1
    }`;
    totalSizeElement.innerText = data.total_size;

    addListToTable(data.data, "data");
};

export const addListToTable = (list, tableId) => {
    const tbody = document.getElementById(tableId);
    if (!tbody) {
        console.error(`Table body with id ${tableId} not found.`);
        return;
    }

    tbody.innerHTML = "";

    // Create header row
    const headerRow = document.createElement("tr");

    // Add column headers based on keys of the first item in the list
    Object.keys(list[0]).forEach((key) => {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });

    // Add "Edit" and "Delete" columns to the header
    const editTh = document.createElement("th");
    editTh.textContent = "Edit";
    headerRow.appendChild(editTh);

    const deleteTh = document.createElement("th");
    deleteTh.textContent = "Delete";
    headerRow.appendChild(deleteTh);

    tbody.appendChild(headerRow);

    // Add data rows to the table
    list.forEach((item) => {
        const tr = document.createElement("tr");

        // Add cells with data from each item
        Object.values(item).forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value !== null ? value : "";
            tr.appendChild(td);
        });

        // Create "Edit" and "Delete" buttons wrapped in <td>
        const editTd = document.createElement("td");
        const editLink = document.createElement("a");
        editLink.href = `../EditBoth.html?data=${JSON.stringify(item)}`;
        editLink.classList.add("btn", "btn-primary");
        editLink.textContent = "Edit";
        editLink.onclick = () => {
            console.log("Edit button clicked for:", item);
            // Handle edit logic here
        };
        editTd.appendChild(editLink);
        tr.appendChild(editTd);

        const deleteTd = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            const fullNameSpan = document.getElementById("delete-fullname");

            if (fullNameSpan) {
                const fullName = `${item.firstName} ${item.lastName}`;

                fullNameSpan.textContent = fullName;

                console.log(fullName);

                // Show the delete modal
                const deleteModal = new bootstrap.Modal(
                    document.getElementById("deleteModal"),
                );
                deleteModal.show();

                // Handle delete confirmation
                const deleteConfirmBtn =
                    document.getElementById("confirmDeleteBtn");
                deleteConfirmBtn.onclick = () => {
                    console.log("Deleting person:", item);
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = JSON.stringify({
                        SQL_Employee_ID: item.SQL_Employee_ID,
                        mongoDBEmployeeId: item.mongoDBEmployeeId,
                    });

                    const requestOptions = {
                        method: "DELETE",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                    };

                    fetch("http://localhost:8080/both", requestOptions)
                        .then((response) => response.text())
                        .then(async (result) => {
                            console.log(result);
                            let pageNumber = 1;
                            const pageSize = 10;

                            fetchDataAndAddToTable(pageNumber, pageSize);
                        })
                        .catch((error) => console.error(error));
                    // Perform delete action (e.g., make API request)

                    // Close the modal
                    deleteModal.hide();
                };
            } else {
                console.error("Modal elements not found.");
            }
        };
        deleteTd.appendChild(deleteBtn);
        tr.appendChild(deleteTd);

        tbody.appendChild(tr);
    });
};

let pageNumber = 1;
const pageSize = 10;

fetchDataAndAddToTable(pageNumber, pageSize);

document.getElementById("nextPage").addEventListener("click", () => {
    pageNumber++;
    fetchDataAndAddToTable(pageNumber, pageSize);
});

document.getElementById("previousPage").addEventListener("click", () => {
    if (pageNumber > 1) {
        pageNumber--;
        fetchDataAndAddToTable(pageNumber, pageSize);
    }
});

export const addDataToTable = (data, tableId) => {
    const tbody = document.getElementById(tableId);
    if (tbody) {
        const newRow = document.createElement("tr");
        Object.values(data.personal).forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value !== null ? value : "";
            newRow.appendChild(td);
        });

        const headerRow = tbody.querySelector("tr:first-child");
        if (headerRow) {
            tbody.insertBefore(newRow, headerRow.nextSibling);
        } else {
            console.error(`Header row not found in table with id ${tableId}.`);
        }

        $("#realtimeModal").modal("show");

        var firstName = data.personal.First_Name || data.personal.firstName;

        var lastName = data.personal.Last_Name || data.personal.lastName;

        var fullName = firstName + " " + lastName;

        document.getElementById("realtime-fullname").innerText = fullName;

        var totalSizeElement = document.getElementById("total-size");
        if (totalSizeElement) {
            var totalSize = parseInt(totalSizeElement.innerText);
            totalSizeElement.innerText = totalSize + 1;
        } else {
            console.error("Element with id 'total-size' not found.");
        }
    } else {
        console.error(`Table body with id ${tableId} not found.`);
    }
};

Pusher.logToConsole = true;

var pusher = new Pusher("658f3c8a3e5ef69474b1", {
    cluster: "ap1",
});

var channel = pusher.subscribe("IntegrationSystem");
channel.bind("HR-person-created", function (data) {
    console.log(data);
    addDataToTable(data, "data");
});

channel.bind("SIS-employee-created", function (data) {
    console.log(data);
    addDataToTable(data, "data");
});
