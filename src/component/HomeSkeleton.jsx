const HomeSkeleton = () => {
    return (
        <div style={{ padding: "2rem" }}>
            {/* Navbar skeleton */}
            <div style={{
                height: "50px",
                width: "100%",
                background: "#ddd",
                marginBottom: "20px",
                borderRadius: "8px",
                animation: "pulse 1.5s infinite"
            }} />

            {/* Title skeleton */}
            <div style={{
                height: "30px",
                width: "70%",
                background: "#ddd",
                marginBottom: "20px",
                borderRadius: "6px",
                animation: "pulse 1.5s infinite"
            }} />

            {/* Image skeleton */}
            <div style={{
                height: "250px",
                width: "100%",
                background: "#ddd",
                marginBottom: "20px",
                borderRadius: "12px",
                animation: "pulse 1.5s infinite"
            }} />

            {/* Cards skeleton */}
            {[1,2,3].map(i => (
                <div key={i} style={{
                    height: "80px",
                    width: "100%",
                    background: "#ddd",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    animation: "pulse 1.5s infinite"
                }} />
            ))}

            <style>
                {`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.4; }
                    100% { opacity: 1; }
                }
                `}
            </style>
        </div>
    );
};

export default HomeSkeleton;