const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

document
    .getElementById("createEmployeeForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu một cách thông thường

        const formData = new FormData(this); // Lấy dữ liệu từ biểu mẫu
        const json = {}; // Tạo một đối tượng JSON để lưu trữ dữ liệu

        // Lặp qua mỗi cặp khóa/giá trị trong FormData và thêm chúng vào đối tượng JSON
        formData.forEach(function (value, key) {
            json[key] = value;
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(json), // Chuyển đổi đối tượng JSON thành chuỗi JSON và gán vào body
            redirect: "follow",
        };

        fetch("http://localhost:4000/api/employee", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // Hiển thị modal thành công
                const fullName =
                    document.getElementById("firstName").value +
                    " " +
                    document.getElementById("lastName").value;
                document.getElementById("fullName").textContent = fullName;
                $("#successModal").modal("show");
            })
            .catch((error) => console.error(error));
    });
