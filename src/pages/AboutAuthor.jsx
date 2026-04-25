import React from "react";
import Navbar from "../component/Navbar";
import "../App.css";

const AboutAuthor = () => {
    return (
        <>
            <Navbar />

            <div style={styles.page}>
                <div style={styles.container} className="about-container">

                    <div style={styles.left}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                            alt="author illustration"
                            style={{ ...styles.avatar, ...styles.floating }}
                        />

                        <h2 style={styles.title}>ABOUT THE AUTHOR:</h2>
                        <h3 style={styles.name}>Aditya Raj</h3>
                    </div>

                    <div style={styles.right}>

                        <section style={styles.section}>
                            <h3 style={styles.heading}>My Writing Journey</h3>
                            <p style={styles.text}>
                                I am writing stories based on human emotions, relationships,
                                and everyday life. My writing explores nostalgia, connection,
                                and the small moments that shape us.
                            </p>
                        </section>

                        <section style={styles.section}>
                            <h3 style={styles.heading}>What Inspires Me</h3>
                            <p style={styles.text}>
                                Life inspires me, conversations, silence, memories, and people
                                I meet. I try to capture emotions that often go unnoticed but
                                stay with us forever.
                            </p>
                        </section>

                        <section style={styles.section}>
                            <h3 style={styles.heading}>Welcome to My Story Nook</h3>
                            <p style={styles.text}>
                                I hope you find comfort and reflection in my work, and that
                                my stories make you pause and feel something real.
                            </p>
                        </section>

                    </div>

                </div>
            </div>

            {/* RESPONSIVE CSS */}
            <style>
                {`
                    @media (max-width: 768px) {
                        .about-container {
                            flex-direction: column !important;
                            gap: 30px !important;
                            text-align: center;
                        }
                    }
                `}
            </style>
        </>
    );
};

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f7f2ec",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px"
    },

    container: {
        display: "flex",
        maxWidth: "1000px",
        width: "100%",
        gap: "60px",
        alignItems: "center"
    },

    left: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
    },

    avatar: {
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "20px"
    },

    floating: {
        animation: "float 4s ease-in-out infinite"
    },

    title: {
        fontSize: "14px",
        letterSpacing: "2px",
        fontWeight: "600"
    },

    name: {
        fontSize: "16px",
        marginTop: "6px",
        fontWeight: "500"
    },

    right: {
        flex: 2
    },

    section: {
        marginBottom: "30px"
    },

    heading: {
        fontSize: "20px",
        marginBottom: "8px",
        color: "#333"
    },

    text: {
        fontSize: "15px",
        lineHeight: "1.8",
        color: "#555",
        textAlign: "justify"
    }
};

export default AboutAuthor;