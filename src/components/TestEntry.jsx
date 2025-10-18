// src/components/TestEntry.jsx
import { useEffect, useState } from "react";
import reportsData from "../data/reportsData.json";

function TestEntry({ onSave }) {
    const [selectedReport, setSelectedReport] = useState("");
    const [testList, setTestList] = useState([]);
    const [results, setResults] = useState({});

    useEffect(() => {
        if (selectedReport) {
            const tests = reportsData[selectedReport] || [];
            setTestList(tests);
            setResults({});
        }
    }, [selectedReport]);

    const handleResultChange = (testName, value) => {
        setResults((prev) => ({ ...prev, [testName]: value }));
    };

    const handleSaveTests = () => {
        const finalTests = testList.map((t) => ({
            name: t.name,
            range: t.range,
            unit: t.unit,
            result: results[t.name] || "",
        }));

        onSave(finalTests, selectedReport); // ✅ send report name too
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">🧪 Select Report Type</h2>

            {/* Report Selection Dropdown */}
            <select
                className="border p-2 rounded-md w-full mb-4"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
            >
                <option value="">-- Select Report --</option>
                {Object.keys(reportsData).map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
            </select>

            {/* ✅ Dynamic Report Heading */}
            {selectedReport && (
                <h3 className="text-xl font-bold text-center text-red-700 uppercase mb-3 underline tracking-wide">
                    🧾 {selectedReport} Report
                </h3>
            )}

            {/* Test Table */}
            {selectedReport && (
                <table className="w-full border-collapse border border-gray-400 text-center text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-1">Test Name</th>
                            <th className="border p-1">Result</th>
                            <th className="border p-1">Normal Range</th>
                            <th className="border p-1">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testList.map((t, i) => (
                            <tr key={i}>
                                <td className="border p-1">{t.name}</td>
                                <td className="border p-1">
                                    <input
                                        type="text"
                                        value={results[t.name] || ""}
                                        onChange={(e) => handleResultChange(t.name, e.target.value)}
                                        className="border rounded-md p-1 w-full"
                                    />
                                </td>
                                <td className="border p-1">{t.range}</td>
                                <td className="border p-1">{t.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Save Report Button */}
            {selectedReport && (
                <div className="text-right mt-3">
                    <button
                        onClick={handleSaveTests}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        💾 Save Report
                    </button>
                </div>
            )}
        </div>
    );
}

export default TestEntry;
