// src/components/HeaderToggle.jsx
import { useState } from "react";

function HeaderToggle({ onToggle }) {
    const [includeHeader, setIncludeHeader] = useState(true);

    const handleChange = (e) => {
        const checked = e.target.checked;
        setIncludeHeader(checked);
        onToggle(checked);
    };

    return (
        <div className="mb-4 flex items-center space-x-2">
            <input
                type="checkbox"
                id="headerToggle"
                checked={includeHeader}
                onChange={handleChange}
                className="accent-red-600 w-4 h-4"
            />
            <label htmlFor="headerToggle" className="font-medium">
                Include Header in Report
            </label>
        </div>
    );
}

// src/components/HeaderToggle.jsx
export function CustomHeader() {
    // ✅ use import.meta.env.BASE_URL (Vite auto handles base path)
    const logoPath = `${import.meta.env.BASE_URL}lab_logo1.png`;

    return (
        <div className="border-2 border-black p-3 rounded-md shadow-sm bg-white">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img
                        src={logoPath}
                        alt="Lab Logo"
                        crossOrigin="anonymous"
                        className="w-16 h-16 object-contain"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <div>
                        <h1 className="text-2xl font-extrabold text-red-700 uppercase leading-tight">
                            Maruti Nisarg Laboratory (Patho)
                        </h1>
                    </div>
                </div>
            </div>

            <div className="border-t-2 border-red-600 mt-2 pt-2 flex justify-between text-sm">
                <div>
                    <p className="font-semibold text-red-700">Heena Modh</p>
                    <p><em>B.Sc. Pg.DMLT</em></p>
                    <p>Mo. 9925392485</p>
                </div>

                <div className="text-center text-sm">
                    <p className="font-semibold">Time - 8.30 am to 8.00 pm</p>
                    <p className="font-semibold">Sun - Closed</p>
                    <p className="font-semibold">
                        Nr. Nagrik Bank, Soni Bazar, Sinor-391115, Dist. Vadodara
                    </p>
                </div>

                <div className="text-right">
                    <p className="font-semibold text-red-700">Pinakin Patel</p>
                    <p><em>B.Sc. MLT</em></p>
                    <p>Mo. 8849082370</p>
                </div>
            </div>
        </div>
    );
}

export default HeaderToggle;
