import { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CustomHeader } from "./HeaderToggle";

function ReportPreview({ patientData, tests, includeHeader, reportName }) {
    const reportRef = useRef();
    const [localPatient, setLocalPatient] = useState(null);
    const [localTests, setLocalTests] = useState([]);
    const [localReportName, setLocalReportName] = useState("");

    useEffect(() => {
        if (patientData) setLocalPatient(patientData);
        if (tests && tests.length > 0) setLocalTests(tests);
        if (reportName) setLocalReportName(reportName);
    }, [patientData, tests, reportName]);

    const waitForImages = (element) => {
        const imgs = element.getElementsByTagName("img");
        return Promise.all(
            Array.from(imgs).map(
                (img) =>
                    new Promise((resolve) => {
                        if (img.complete) resolve();
                        else img.onload = img.onerror = resolve;
                    })
            )
        );
    };

    const handleSavePDF = async () => {
        if (!reportRef.current) return;

        try {
            await waitForImages(reportRef.current);

            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            const fileName = `${localPatient?.name || "Lab_Report"}_${localPatient?.patientId || "ID"}.pdf`;
            pdf.save(fileName);

            alert("✅ PDF saved successfully!");
        } catch (err) {
            console.error("❌ PDF generation failed:", err);
            alert("Something went wrong while saving the report!");
        }
    };

    return (
        <div style={{ marginTop: "24px" }}>
            <div
                ref={reportRef}
                style={{
                    backgroundColor: "#ffffff",
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                }}
            >
                {includeHeader && (
                    <div style={{ marginBottom: "16px" }}>
                        <CustomHeader />
                    </div>
                )}

                {localPatient && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px",
                            marginBottom: "16px",
                        }}
                    >
                        <p><strong>Patient ID:</strong> {localPatient.patientId}</p>
                        <p><strong>Name:</strong> {localPatient.name}</p>
                        <p><strong>Age:</strong> {localPatient.age}</p>
                        <p><strong>Gender:</strong> {localPatient.gender}</p>
                        <p><strong>Contact:</strong> {localPatient.contact}</p>
                        <p><strong>Date:</strong> {localPatient.date}</p>
                    </div>
                )}

                {localReportName && (
                    <h3
                        style={{
                            textAlign: "center",
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#b91c1c", // red-700
                            textDecoration: "underline",
                            marginBottom: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                        }}
                    >
                        🧾 {localReportName} Report
                    </h3>
                )}

                {localTests?.length > 0 ? (
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            textAlign: "center",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#e5e7eb" /* gray-200 */ }}>
                                <th style={{ border: "1px solid #9ca3af", padding: "4px" }}>Test Name</th>
                                <th style={{ border: "1px solid #9ca3af", padding: "4px" }}>Result</th>
                                <th style={{ border: "1px solid #9ca3af", padding: "4px" }}>Normal Range</th>
                                <th style={{ border: "1px solid #9ca3af", padding: "4px" }}>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localTests.map((t, i) => (
                                <tr key={i}>
                                    <td style={{ border: "1px solid #9ca3af", padding: "4px" }}>{t.name}</td>
                                    <td style={{ border: "1px solid #9ca3af", padding: "4px" }}>{t.result}</td>
                                    <td style={{ border: "1px solid #9ca3af", padding: "4px" }}>{t.range}</td>
                                    <td style={{ border: "1px solid #9ca3af", padding: "4px" }}>{t.unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ textAlign: "center", color: "#6b7280" /* gray-500 */ }}>
                        No tests entered yet.
                    </p>
                )}
            </div>

            <div style={{ marginTop: "16px", textAlign: "right" }}>
                <button
                    onClick={handleSavePDF}
                    style={{
                        backgroundColor: "#16a34a", // green-600
                        color: "#ffffff",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
                >
                    Save as PDF
                </button>
            </div>
        </div>
    );
}

export default ReportPreview;
