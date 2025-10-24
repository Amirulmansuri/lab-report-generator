// src/components/ReportPreview.jsx
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
        <div className="mt-6">
            <div
                ref={reportRef}
                className="bg-white p-6 rounded-lg shadow-md text-sm leading-relaxed"
            >
                {includeHeader && (
                    <div className="mb-4">
                        <CustomHeader />
                    </div>
                )}

                {localPatient && (
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <p><strong>Patient ID:</strong> {localPatient.patientId}</p>
                        <p><strong>Name:</strong> {localPatient.name}</p>
                        <p><strong>Age:</strong> {localPatient.age}</p>
                        <p><strong>Gender:</strong> {localPatient.gender}</p>
                        <p><strong>Contact:</strong> {localPatient.contact}</p>
                        <p><strong>Date:</strong> {localPatient.date}</p>
                    </div>
                )}

                {localReportName && (
                    <h3 className="text-center text-xl font-bold text-red-700 underline mb-3 uppercase tracking-wide">
                        🧾 {localReportName} Report
                    </h3>
                )}

                {localTests?.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-400 text-center">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-400 p-1">Test Name</th>
                                <th className="border border-gray-400 p-1">Result</th>
                                <th className="border border-gray-400 p-1">Normal Range</th>
                                <th className="border border-gray-400 p-1">Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localTests.map((t, i) => (
                                <tr key={i}>
                                    <td className="border border-gray-400 p-1">{t.name}</td>
                                    <td className="border border-gray-400 p-1">{t.result}</td>
                                    <td className="border border-gray-400 p-1">{t.range}</td>
                                    <td className="border border-gray-400 p-1">{t.unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No tests entered yet.</p>
                )}
            </div>

            <div className="mt-4 text-right">
                <button
                    onClick={handleSavePDF}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Save as PDF
                </button>
            </div>
        </div>
    );
}

export default ReportPreview;
