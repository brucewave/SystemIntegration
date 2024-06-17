const endPointLink = "http://localhost:4000/api/employee";
export const getListPerson = async () => {
    try {
        const res = await axios.get(endPointLink);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getListPerson_Fetch = async () => {
    try {
        const res = await fetch(endPointLink);
        const response_data = await res.json();
        console.log("Phản hồi từ máy chủ:", response_data);
    } catch (error) {
        console.log("Lỗi khi lấy dữ liệu:", error);
    }
};

export const addListPersonToTable = async (list, tableId) => {
    const tbody = document.getElementById(tableId);
    try {
        list.data.forEach((element) => {
            const { _id, ...data } = element;
            const tr = document.createElement("tr");
            Object.values(data).forEach((value) => {
                const td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    } catch (error) {}
};

addListPersonToTable(await getListPerson(), "data");
