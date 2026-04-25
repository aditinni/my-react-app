import Skeleton from "./Skeleton";

const StorySkeleton = () => {
  return (
    <div style={styles.container}>
      <Skeleton width="60%" height="28px" />

      <div style={{ marginTop: "15px" }}>
        <Skeleton height="220px" radius="12px" />
      </div>

      <div style={{ marginTop: "20px" }}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton width="80%" />
        <Skeleton width="90%" />
        <Skeleton width="70%" />
        <Skeleton width="60%" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "700px",
    margin: "auto"
  }
};

export default StorySkeleton;