import Skeleton from "./Skeleton";

const HomeSkeleton = () => {
  return (
    <div style={styles.container}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={styles.card}>
          <Skeleton height="180px" radius="12px" />
          <div style={{ marginTop: "10px" }}>
            <Skeleton width="70%" height="18px" />
            <div style={{ marginTop: "8px" }}>
              <Skeleton width="100%" />
              <Skeleton width="90%" />
              <Skeleton width="60%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
    display: "grid",
    gap: "20px"
  },

  card: {
    padding: "15px",
    borderRadius: "12px",
    background: "#fff"
  }
};

export default HomeSkeleton;