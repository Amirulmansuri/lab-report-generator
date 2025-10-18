// src/App.jsx
import { useState } from "react";
import PatientInfo from "./components/PatientInfo";
import TestEntry from "./components/TestEntry";
import ReportPreview from "./components/ReportPreview";
import HeaderToggle from "./components/HeaderToggle";

function App() {
  const [patientData, setPatientData] = useState(null);
  const [tests, setTests] = useState([]);
  const [includeHeader, setIncludeHeader] = useState(true);
  const [reportName, setReportName] = useState(""); // ✅ Added state for report name

  // 🧩 Called when "Save Info" clicked
  const handleSaveInfo = (info) => {
    setPatientData(info);
  };

  // 🧩 Called when "Save Report" clicked
  // Now accepts both test list and report name
  const handleSaveReport = (testList, selectedReportName) => {
    setTests(testList);
    setReportName(selectedReportName); // ✅ Store report name
  };

  // 🧩 Header toggle checkbox
  const handleHeaderToggle = (checked) => {
    setIncludeHeader(checked);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-center text-3xl font-bold text-blue-700 mb-6">
        🧪 Laboratory Report Generator
      </h1>

      {/* Patient Info */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
        <PatientInfo onSave={handleSaveInfo} />
      </div>

      {/* Header Toggle */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <HeaderToggle onToggle={handleHeaderToggle} />
      </div>

      {/* Test Entry */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <TestEntry onSave={handleSaveReport} /> {/* ✅ Sends testList + reportName */}
      </div>

      {/* Report Preview */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <ReportPreview
          patientData={patientData}
          tests={tests}
          includeHeader={includeHeader}
          reportName={reportName} // ✅ Pass to preview
        />
      </div>
    </div>
  );
}

export default App;
