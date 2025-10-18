import { useState, useEffect, useRef } from "react";

export default function PatientInfo({ onSave }) {
    const [info, setInfo] = useState({
        name: "",
        age: "",
        gender: "Male",
        contact: "",
        date: "",
        patientId: "",
    });

    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return; // prevent double run
        initialized.current = true;

        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];

        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yy = String(today.getFullYear()).slice(-2);

        const stored = JSON.parse(localStorage.getItem("patientSeries")) || {};
        let newSeries = 1;

        if (stored.date === formattedDate) {
            newSeries = stored.series + 1;
        }

        localStorage.setItem(
            "patientSeries",
            JSON.stringify({ date: formattedDate, series: newSeries })
        );

        const patientId = `${dd}${mm}${yy}/${String(newSeries).padStart(3, "0")}`;

        setInfo((prev) => ({
            ...prev,
            date: formattedDate,
            patientId,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const handleSave = () => {
        onSave(info, []); // send info to parent
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Patient Information</h2>

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    value={info.name}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={info.age}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />

                <select
                    name="gender"
                    value={info.gender}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input
                    type="text"
                    name="contact"
                    placeholder="Contact Number"
                    value={info.contact}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />

                <input
                    type="date"
                    name="date"
                    value={info.date}
                    readOnly
                    className="p-2 border rounded bg-gray-100"
                />

                <input
                    type="text"
                    name="patientId"
                    value={info.patientId}
                    readOnly
                    className="p-2 border rounded bg-gray-100 font-semibold"
                />
            </div>

            <button
                onClick={handleSave}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Save Info
            </button>
        </div>
    );
}
