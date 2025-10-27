import { useState } from "react";

function HeaderToggle({ onToggle }) {
    const [includeHeader, setIncludeHeader] = useState(true);

    const handleChange = (e) => {
        const checked = e.target.checked;
        setIncludeHeader(checked);
        onToggle(checked);
    };

    return (
        <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
                type="checkbox"
                id="headerToggle"
                checked={includeHeader}
                onChange={handleChange}
                style={{
                    accentColor: "#dc2626",
                    width: "16px",
                    height: "16px",
                }}
            />
            <label htmlFor="headerToggle" style={{ fontWeight: 500 }}>
                Include Header in Report
            </label>
        </div>
    );
}

export function CustomHeader() {
    const logoPath = `${import.meta.env.BASE_URL}lab_logo1.png`;

    return (
        <div
            style={{
                border: "2px solid #000",
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                marginBottom: "12px",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                        src={logoPath}
                        alt="Lab Logo"
                        crossOrigin="anonymous"
                        style={{
                            width: "64px",
                            height: "64px",
                            objectFit: "contain",
                        }}
                        onError={(e) => (e.target.style.display = "none")}
                    />
                    <div>
                        <h1
                            style={{
                                fontSize: "25px",
                                fontWeight: 800,
                                color: "#b91c1c",
                                textTransform: "uppercase",
                                lineHeight: "1.2",
                            }}
                        >
                            Maruti Nisarg Laboratory (Patho)
                        </h1>
                    </div>
                </div>
            </div>

            <div
                style={{
                    borderTop: "2px solid #dc2626",
                    marginTop: "8px",
                    paddingTop: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "15px",
                }}
            >
                <div>
                    <p style={{ fontWeight: 600, color: "#b91c1c" }}>Heena Modh</p>
                    <p><em>B.Sc. Pg.DMLT</em></p>
                    <p>Mo. 9925392485</p>
                </div>

                <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: 600 }}>Time - 8.30 am to 8.00 pm</p>
                    <p style={{ fontWeight: 600 }}>Sun - Closed</p>
                    <p style={{ fontWeight: 600 }}>
                        Nr. Nagrik Bank, Soni Bazar, Sinor-391115, Dist. Vadodara
                    </p>
                </div>

                <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 600, color: "#b91c1c" }}>Pinakin Patel</p>
                    <p><em>B.Sc. MLT</em></p>
                    <p>Mo. 8849082370</p>
                </div>
            </div>
        </div>
    );
}

export default HeaderToggle;
