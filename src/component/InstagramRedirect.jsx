import { useEffect, useState } from "react";

const InstagramRedirect = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;

    if (ua.includes("Instagram")) {
      setShow(true);
    }
  }, []);

  const openInBrowser = () => {
   
    const url = window.location.href;
    window.location.href = `intent://${url.replace(
      /^https?:\/\//,
      ""
    )}#Intent;scheme=https;package=com.android.chrome;end`;

    setTimeout(() => {
      window.open(url, "_blank");
    }, 500);
  };

  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3 style={{ marginBottom: "10px" }}>Better Experience</h3>

        <p style={{ fontSize: "14px", marginBottom: "15px" }}>
          For audio, animations & smooth reading, open in your browser.
        </p>

        <button onClick={openInBrowser} style={styles.button}>
          Open in Chrome
        </button>

        <p style={{ fontSize: "12px", marginTop: "10px", opacity: 0.7 }}>
          Or tap ⋮ (top right) → Open in browser
        </p>

        <span style={styles.close} onClick={() => setShow(false)}>
          ✕
        </span>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999
  },

  popup: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "85%",
    maxWidth: "320px",
    textAlign: "center",
    position: "relative"
  },

  button: {
    background: "#CC7A6B",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontSize: "14px"
  },

  close: {
    position: "absolute",
    top: "8px",
    right: "10px",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default InstagramRedirect;