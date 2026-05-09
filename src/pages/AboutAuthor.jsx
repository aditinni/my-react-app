import React from "react";
import Navbar from "../component/Navbar";
import "../App.css";

const AboutAuthor = () => {
    const darkMode = true; // if you later make global theme, replace this

    return (
        <>
            <Navbar />

            <div className={`about-page ${darkMode ? "dark" : "light"}`}>
                <div className="about-bg-glow left" />
                <div className="about-bg-glow right" />
                <div className="about-grid" />

                <div className="about-container">

                    {/* LEFT */}
                    <div className="about-left">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                            alt="author"
                            className="about-avatar"
                        />

                        <div className="about-kicker">
                            ABOUT THE AUTHOR
                        </div>

                        <h2 className="about-name">Aditya Raj</h2>

                        <div className="about-line" />
                    </div>

                    {/* RIGHT */}
                    <div className="about-right">

                        <section className="about-card">
                            <h3 className="about-heading">My Writing Journey</h3>
                            <p className="about-text">
                                I write stories centered around human emotion,
                                relationships, and everyday life. My work explores
                                nostalgia, connection, and the quiet moments that
                                shape who we become.
                            </p>
                        </section>

                        <section className="about-card">
                            <h3 className="about-heading">What Inspires Me</h3>
                            <p className="about-text">
                                Life inspires me — conversations, silence,
                                memories, and people I meet. I try to capture
                                emotions that often go unnoticed but stay with us.
                            </p>
                        </section>

                        <section className="about-card highlight">
                            <h3 className="about-heading">Welcome to My Story Nook</h3>
                            <p className="about-text">
                                I hope you find comfort and reflection here,
                                and that these stories make you pause, feel,
                                and reconnect with something real.
                            </p>
                        </section>

                    </div>
                </div>
            </div>

            <style>
                {`
                .about-page {
                    min-height: 100vh;
                    position: relative;
                    overflow: hidden;
                    transition: background 0.3s ease, color 0.3s ease;
                }

                .about-page.dark {
                    background: #0C0C0F;
                    color: rgba(255,255,255,0.9);
                }

                .about-page.light {
                    background: #F6F3EE;
                    color: #111;
                }

                /* BACKGROUNDS */
                .about-bg-glow {
                    position: absolute;
                    width: 420px;
                    height: 420px;
                    border-radius: 50%;
                    filter: blur(120px);
                    pointer-events: none;
                    z-index: 0;
                }

                .about-bg-glow.left {
                    top: -120px;
                    left: -120px;
                    background: radial-gradient(circle,
                        rgba(157,120,242,0.18),
                        transparent 70%);
                }

                .about-bg-glow.right {
                    bottom: -140px;
                    right: -140px;
                    background: radial-gradient(circle,
                        rgba(196,168,255,0.12),
                        transparent 70%);
                }

                .about-grid {
                    position: absolute;
                    inset: 0;
                    opacity: 0.03;
                    background-image: repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 44px,
                        rgba(255,255,255,1) 44px,
                        rgba(255,255,255,1) 45px
                    );
                    pointer-events: none;
                    z-index: 0;
                }

                /* LAYOUT */
                .about-container {
                    position: relative;
                    z-index: 1;

                    max-width: 1050px;
                    margin: 0 auto;
                    padding: 4rem 1.5rem;

                    display: flex;
                    align-items: center;
                    gap: 4rem;
                }

                /* LEFT */
                .about-left {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .about-avatar {
                    width: 170px;
                    height: 170px;
                    border-radius: 50%;
                    object-fit: cover;

                    animation: float 5s ease-in-out infinite;

                    border: 1px solid rgba(196,168,255,0.2);
                    box-shadow: 0 20px 50px rgba(130,90,255,0.15);
                }

                .about-kicker {
                    margin-top: 1.5rem;
                    font-family: "DM Mono";
                    font-size: 0.65rem;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: #C4A8FF;
                    opacity: 0.8;
                }

                .about-name {
                    font-family: "Cormorant Garamond";
                    font-size: 1.8rem;
                    font-weight: 300;
                    margin-top: 0.5rem;
                }

                .about-line {
                    width: 40px;
                    height: 1px;
                    margin-top: 1rem;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        #C4A8FF,
                        transparent
                    );
                    opacity: 0.6;
                }

                /* RIGHT */
                .about-right {
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .about-card {
                    padding: 1.6rem 1.8rem;
                    border-radius: 16px;

                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);

                    transition: all 0.25s ease;
                }

                .about-card:hover {
                    transform: translateY(-3px);
                    border-color: rgba(196,168,255,0.18);
                    box-shadow: 0 18px 40px rgba(130,90,255,0.08);
                }

                .about-card.highlight {
                    background: linear-gradient(
                        135deg,
                        rgba(196,168,255,0.08),
                        rgba(196,168,255,0.02)
                    );
                    border-color: rgba(196,168,255,0.18);
                }

                .about-heading {
                    font-family: "Cormorant Garamond";
                    font-size: 1.3rem;
                    font-weight: 400;
                    margin-bottom: 0.5rem;
                }

                .about-text {
                    font-family: system-ui;
                    font-size: 0.95rem;
                    line-height: 1.8;

                    color: inherit;
                    opacity: 0.75;
                }

                /* LIGHT MODE FIX */
                .about-page.light .about-card {
                    background: rgba(0,0,0,0.03);
                    border: 1px solid rgba(0,0,0,0.08);
                }

                .about-page.light .about-text {
                    opacity: 0.85;
                    color: #111;
                }

                .about-page.light .about-name {
                    color: #111;
                }

                .about-page.light .about-kicker {
                    color: #7254D4;
                }

                /* ANIMATION */
                @keyframes float {
                    0%,100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                /* RESPONSIVE */
                @media (max-width: 768px) {
                    .about-container {
                        flex-direction: column;
                        text-align: center;
                        gap: 2.5rem;
                    }
                }
                `}
            </style>
        </>
    );
};

export default AboutAuthor;