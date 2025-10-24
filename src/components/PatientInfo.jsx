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
        <div
            style={{
                backgroundColor: "#ffffff",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                marginBottom: "16px",
            }}
        >
            <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
                Patient Information
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                }}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    value={info.name}
                    onChange={handleChange}
                    style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={info.age}
                    onChange={handleChange}
                    style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                <select
                    name="gender"
                    value={info.gender}
                    onChange={handleChange}
                    style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
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
                    style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                <input
                    type="date"
                    name="date"
                    value={info.date}
                    readOnly
                    style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        backgroundColor: "#f3f4f6", // gray-100 equivalent
                    }}
                />

                <input
                    type="text"
                    name="patientId"
                    value={info.patientId}
                    readOnly
                    style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        backgroundColor: "#f3f4f6",
                        fontWeight: 600,
                    }}
                />
            </div>

            <button
                onClick={handleSave}
                style={{
                    marginTop: "16px",
                    backgroundColor: "#2563eb", // blue-600
                    color: "#ffffff",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
            >
                Save Info
            </button>
        </div>
    );
}
