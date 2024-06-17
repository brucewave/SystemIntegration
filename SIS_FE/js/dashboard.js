export const getGenderRatio = async () => {
    try {
        let response = await axios.get(`http://localhost:8080/gender-ratio`);
        return response.data.data; // Trả về dữ liệu JSON
    } catch (e) {
        console.log(e);
    }
};

const updateGenderRatio = async () => {
    const data = await getGenderRatio();
    if (data) {
        const maleRatioElement = document.getElementById("male-ratio");
        const femaleRatioElement = document.getElementById("female-ratio");
        const otherRatioElement = document.getElementById("other-ratio");
        const totalUserElement = document.getElementById("total-user");

        const maleRatioElementPercent =
            document.getElementById("male-ratio-width");
        const femaleRatioElementPercent =
            document.getElementById("female-ratio-width");
        const otherRatioElementPercent =
            document.getElementById("other-ratio-width");

        // Tính tỷ lệ nam và nữ từ dữ liệu JSON
        const malePercentage = data.male;
        const femalePercentage = data.female;
        const otherPercentage = data.other;
        const totalUser = data.total;

        // Cập nhật HTML với dữ liệu mới
        maleRatioElement.textContent = `${malePercentage}%`;
        maleRatioElementPercent.style.width = `${malePercentage}%`;

        femaleRatioElement.textContent = `${femalePercentage}%`;
        femaleRatioElementPercent.style.width = `${femalePercentage}%`;

        otherRatioElement.textContent = `${otherPercentage}%`;
        otherRatioElementPercent.style.width = `${otherPercentage}%`;

        totalUserElement.textContent = `${totalUser}`;
    }
};

export const showModalRealTime = (data, tableId) => {
    // Hiển thị modal
    $("#realtimeModal").modal("show");

    // Điền tên đầy đủ vào phần realtime-fullname
    var fullName = data.personal.First_Name + " " + data.personal.Last_Name;
    document.getElementById("realtime-fullname").innerText = fullName;

    // Lấy và cộng giá trị của phần tử total-size lên 1
    var totalUserElement = document.getElementById("total-user");
    if (totalUserElement) {
        var totalUser = parseInt(totalUserElement.innerText);
        totalUserElement.innerText = totalUser + 1;
    } else {
        console.error("Element with id 'total-user' not found.");
    }
};

// Gọi hàm để cập nhật dữ liệu ban đầu
await updateGenderRatio();

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher("658f3c8a3e5ef69474b1", {
    cluster: "ap1",
});

var channel = pusher.subscribe("IntegrationSystem");
channel.bind("personal-created", function (data) {
    console.log(data);
    showModalRealTime(data, "data");
});
