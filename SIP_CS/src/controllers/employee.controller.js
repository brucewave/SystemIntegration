import Employee from "../models/Employee.js";
import Pusher from "pusher";

// Khởi tạo Pusher client
const pusher = new Pusher({
    appId: "1790030",
    key: "658f3c8a3e5ef69474b1",
    secret: "7010eecf86f9469246bf",
    cluster: "ap1",
    useTLS: true,
});

export const createEmployee = async (req, res) => {
    try {
        const {
            employeeId,
            firstName,
            lastName,
            vacationDays,
            paidToDate,
            paidLastYear,
            payRate,
            payRateId,
        } = req.body;

        // Tạo một đối tượng Employee mới
        const employee = new Employee({
            employeeId,
            firstName,
            lastName,
            vacationDays,
            paidToDate,
            paidLastYear,
            payRate,
            payRateId,
        });

        // Lưu employee mới
        const savedUser = await employee.save();

        // Trigger một sự kiện Pusher khi một employee mới được tạo
        pusher.trigger("IntegrationSystem", "SIS-employee-created", {
            message: "A new employee has been created",
            personal: savedUser,
        });

        return res.status(200).json({
            success: true,
            data: {
                _id: savedUser._id,
                employeeId: savedUser.employeeId,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                vacationDays: savedUser.vacationDays,
                paidToDate: savedUser.paidToDate,
                paidLastYear: savedUser.paidLastYear,
                payRate: savedUser.payRate,
                payRateId: savedUser.payRateId,
            },
        });
    } catch (error) {
        console.error({ success: true, data: error });
    }
};

export const getEmployee = async (req, res, next) => {
    const employee = await Employee.findById(req.params.employeeId);
    return res.json({ success: true, data: employee });
};

export const getEmployees = async (req, res, next) => {
    const employees = await Employee.find();
    return res.json({ success: true, data: employees });
};
