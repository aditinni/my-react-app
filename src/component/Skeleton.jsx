const Skeleton = ({ width = "100%", height = "16px", radius = "6px", style }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, #eee 25%, #ddd 37%, #eee 63%)",
        backgroundSize: "400% 100%",
        animation: "shimmer 1.2s infinite",
        ...style
      }}
    >
      <style>
        {`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        `}
      </style>
    </div>
  );
};

export default Skeleton;