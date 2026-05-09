import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import stories from "../stories/stories.js";
import Navbar from "../component/Navbar";
import Chip from "@mui/material/Chip";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

import confetti from "canvas-confetti";

const StoryPage = () => {
    const { id } = useParams();
    const story = stories.find((s) => s.id === Number(id));

    const [darkMode, setDarkMode] = useState(true);
    const [fontSize, setFontSize] = useState(1.15);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    const speechRef = useRef(null);

    useEffect(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setActiveIndex(null);
        setActiveSentenceIndex(null);
        setProgress(0);
        setCompleted(false);

        return () => window.speechSynthesis.cancel();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    /* 📊 PROGRESS */
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            setProgress((scrollTop / docHeight) * 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* 🎆 CONFETTI */
    useEffect(() => {
        if (progress > 98 && !completed) {
            setCompleted(true);

            const duration = 2000;
            const end = Date.now() + duration;

            const colors = [
                "#9D78F2",
                "#C4A8FF",
                "#7254D4",
                "#ffffff"
            ];

            const frame = () => {
                confetti({
                    particleCount: 5,
                    spread: 90,
                    startVelocity: 35,
                    colors,
                    origin: {
                        x: Math.random(),
                        y: Math.random() * 0.6
                    }
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };

            frame();
        }
    }, [progress, completed]);

    if (!story) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#0C0C0F",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "system-ui"
                }}
            >
                <h2>Story Not Found</h2>
            </div>
        );
    }

    /* 🎧 SPEECH */
    const handleSpeak = () => {
        window.speechSynthesis.cancel();

        if (isSpeaking) {
            setIsSpeaking(false);
            return;
        }

        let sentences = [];

        story.content.forEach((para, pIndex) => {
            para.split(/(?<=[.!?])\s/).forEach((s) => {
                sentences.push({
                    text: s,
                    paraIndex: pIndex
                });
            });
        });

        let index = 0;

        const speakNext = () => {
            if (index >= sentences.length) {
                setIsSpeaking(false);
                setActiveIndex(null);
                setActiveSentenceIndex(null);
                return;
            }

            const current = sentences[index];

            const utter = new SpeechSynthesisUtterance(current.text);

            utter.rate = speed;

            utter.onstart = () => {
                setActiveIndex(current.paraIndex);
                setActiveSentenceIndex(index);

                document
                    .getElementById(`para-${current.paraIndex}`)
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
            };

            utter.onend = () => {
                index++;
                speakNext();
            };

            window.speechSynthesis.speak(utter);
        };

        setIsSpeaking(true);
        speakNext();
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullScreen(true);
        } else {
            document.exitFullscreen();
            setFullScreen(false);
        }
    };

    const Waveform = ({ active }) => (
        <div className="waveform">
            {[...Array(28)].map((_, i) => (
                <span
                    key={i}
                    className={`wave-bar ${active ? "active" : ""}`}
                    style={{
                        animationDelay: `${i * 0.04}s`
                    }}
                />
            ))}
        </div>
    );

    const speedBtnClass = (val) =>
        speed === val ? "speed-btn active" : "speed-btn";

    return (
        <div className={`story-shell ${darkMode ? "dark" : "light"}`}>
            <Navbar />

            {/* PROGRESS BAR */}
            <div
                className="progress-bar"
                style={{
                    width: `${progress}%`
                }}
            />

            {/* BACKDROP */}
            <div className="story-backdrop story-backdrop-left" />
            <div className="story-backdrop story-backdrop-right" />
            <div className="story-grid-overlay" />

            <main className="story-container">
                {/* HEADER */}
                <section className="story-header">
                    <div className="story-label">
                        <span className="story-label-line" />
                        FEATURE STORY
                    </div>

                    <h1 className="story-title">{story.title}</h1>

                    {story.tags && (
                        <div className="story-chip-row">
                            {story.tags.map((tag, i) => (
                                <Chip
                                    key={i}
                                    label={tag}
                                    size="small"
                                    sx={{
                                        background:
                                            "rgba(196,168,255,0.08)",
                                        color: "#C4A8FF",
                                        border:
                                            "1px solid rgba(196,168,255,0.15)",
                                        fontFamily: "DM Mono",
                                        letterSpacing: "0.04em"
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* CONTROL BAR */}
                <section className="control-panel">
                    <div className="control-left">
                        <button
                            className="play-button"
                            onClick={handleSpeak}
                        >
                            {isSpeaking ? (
                                <PauseIcon fontSize="small" />
                            ) : (
                                <PlayArrowIcon fontSize="small" />
                            )}

                            <span>
                                {isSpeaking ? "Pause narration" : "Listen"}
                            </span>
                        </button>

                        <Waveform active={isSpeaking} />
                    </div>

                    <div className="control-right">
                        <div className="speed-group">
                            <span
                                className={speedBtnClass(0.75)}
                                onClick={() => setSpeed(0.75)}
                            >
                                0.75x
                            </span>

                            <span
                                className={speedBtnClass(1)}
                                onClick={() => setSpeed(1)}
                            >
                                1x
                            </span>

                            <span
                                className={speedBtnClass(1.5)}
                                onClick={() => setSpeed(1.5)}
                            >
                                1.5x
                            </span>
                        </div>

                        <div className="icon-controls">
                            <button
                                className="icon-btn"
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                {darkMode ? (
                                    <LightModeIcon fontSize="small" />
                                ) : (
                                    <DarkModeIcon fontSize="small" />
                                )}
                            </button>

                            <button
                                className="icon-btn"
                                onClick={() =>
                                    setFontSize((p) =>
                                        Math.min(p + 0.1, 1.8)
                                    )
                                }
                            >
                                <TextIncreaseIcon fontSize="small" />
                            </button>

                            <button
                                className="icon-btn"
                                onClick={() =>
                                    setFontSize((p) =>
                                        Math.max(p - 0.1, 1)
                                    )
                                }
                            >
                                <TextDecreaseIcon fontSize="small" />
                            </button>

                            <button
                                className="icon-btn"
                                onClick={toggleFullScreen}
                            >
                                <FullscreenIcon fontSize="small" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* STORY BODY */}
                <article
                    className="story-content"
                    style={{
                        fontSize: `${fontSize}rem`
                    }}
                >
                    {story.content.map((para, i) => {
                        const isActive = activeIndex === i;

                        const sentences = para.split(/(?<=[.!?])\s/);

                        let sentenceOffset = 0;

                        for (let k = 0; k < i; k++) {
                            sentenceOffset +=
                                story.content[k].split(/(?<=[.!?])\s/).length;
                        }

                        return (
                            <p
                                id={`para-${i}`}
                                key={i}
                                className={`story-paragraph ${
                                    isActive ? "active-para" : ""
                                }`}
                                style={{
                                    opacity:
                                        activeIndex !== null && !isActive
                                            ? 0.32
                                            : 1,

                                    filter:
                                        activeIndex !== null && !isActive
                                            ? "blur(1px)"
                                            : "none"
                                }}
                            >
                                {sentences.map((sentence, si) => {
                                    const globalIndex =
                                        sentenceOffset + si;

                                    const isSentenceActive =
                                        activeSentenceIndex === globalIndex;

                                    return (
                                        <span
                                            key={si}
                                            className={
                                                isSentenceActive
                                                    ? "active-sentence"
                                                    : ""
                                            }
                                        >
                                            {sentence + " "}
                                        </span>
                                    );
                                })}
                            </p>
                        );
                    })}
                </article>
            </main>

            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

                .story-shell {
                    position: relative;
                    min-height: 100vh;
                    overflow-x: hidden;
                    transition: background 0.3s ease;
                }

                .story-shell.dark {
                    background: #0C0C0F;
                    color: rgba(255,255,255,0.92);
                }

                .story-shell.light {
                    background: #F6F3EE;
                    color: #1f2937;
                }

                .progress-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 3px;
                    background: linear-gradient(
                        90deg,
                        #7254D4,
                        #C4A8FF
                    );
                    z-index: 9999;
                    transition: width 0.2s ease;
                    box-shadow: 0 0 14px rgba(157,120,242,0.45);
                }

                .story-backdrop {
                    position: fixed;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(100px);
                    z-index: 0;
                }

                .story-backdrop-left {
                    width: 420px;
                    height: 420px;
                    background:
                        radial-gradient(circle,
                        rgba(157,120,242,0.12),
                        transparent 70%);
                    top: -120px;
                    left: -140px;
                }

                .story-backdrop-right {
                    width: 320px;
                    height: 320px;
                    background:
                        radial-gradient(circle,
                        rgba(196,168,255,0.08),
                        transparent 70%);
                    bottom: -100px;
                    right: -80px;
                }

                .story-grid-overlay {
                    position: fixed;
                    inset: 0;
                    opacity: 0.02;
                    pointer-events: none;

                    background-image:
                        repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 42px,
                            rgba(255,255,255,1) 42px,
                            rgba(255,255,255,1) 43px
                        );
                }

                .story-container {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 860px;
                    margin: 0 auto;
                    padding: 3rem 1.5rem 6rem;
                }

                .story-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    margin-bottom: 2.5rem;
                    animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1);
                }

                .story-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    font-family: 'DM Mono', monospace;
                    font-size: 0.62rem;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;

                    color: ${
                        darkMode ?   "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.82)"
                    };
                    opacity: 0.82;

                    margin-bottom: 1.5rem;
                }

                .story-label-line {
                    width: 22px;
                    height: 1px;
                    background: rgba(196,168,255,0.55);
                }

                .story-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(2.3rem, 5vw, 4.4rem);
                    line-height: 1.05;
                    letter-spacing: -0.02em;
                    font-weight: 300;
                    max-width: 760px;
                    margin-bottom: 1.5rem;
                    color: ${
                        darkMode                           ? "rgba(255,255,255,0.92)"
                            : "rgba(0,0,0,0.82)"
                    }
                }

                .story-chip-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 8px;
                }

                .control-panel {
                    position: sticky;
                    top: 72px;

                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1.2rem;
                    flex-wrap: wrap;

                    padding: 1rem 1.1rem;
                    margin-bottom: 2.5rem;

                    border: 1px solid rgba(255,255,255,0.06);

                    background: rgba(19,17,26,0.72);

                    backdrop-filter: blur(18px);
                    -webkit-backdrop-filter: blur(18px);

                    border-radius: 18px;

                    z-index: 20;
                }

                .control-left,
                .control-right {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .play-button {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    padding: 10px 16px;

                    border-radius: 12px;
                    border: 1px solid rgba(196,168,255,0.16);

                    background:
                        rgba(196,168,255,0.08);

                    color: #C4A8FF;

                    cursor: pointer;

                    font-size: 0.82rem;
                    font-weight: 600;

                    transition: all 0.22s ease;
                }

                .play-button:hover {
                    background:
                        rgba(196,168,255,0.14);

                    transform: translateY(-1px);
                }

                .waveform {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    height: 34px;
                }

                .wave-bar {
                    width: 3px;
                    height: 8px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.16);
                }

                .wave-bar.active {
                    background: #9D78F2;
                    animation: wave 1s infinite ease-in-out;
                }

                .speed-group {
                    display: flex;
                    gap: 6px;
                }

                .speed-btn {
                    padding: 6px 10px;
                    border-radius: 8px;

                    font-family: 'DM Mono', monospace;
                    font-size: 0.72rem;

                    background: rgba(255,255,255,0.04);

                    border: 1px solid rgba(255,255,255,0.06);

                    color: rgba(255,255,255,0.5);

                    cursor: pointer;

                    transition: all 0.2s ease;
                }

                .speed-btn:hover {
                    border-color: rgba(196,168,255,0.16);
                    color: rgba(255,255,255,0.9);
                }

                .speed-btn.active {
                    background: rgba(196,168,255,0.12);
                    color: #C4A8FF;
                    border-color: rgba(196,168,255,0.22);
                }

                .icon-controls {
                    display: flex;
                    gap: 8px;
                }

                .icon-btn {
                    width: 38px;
                    height: 38px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 10px;

                    border: 1px solid rgba(255,255,255,0.06);

                    background: rgba(255,255,255,0.04);

                    color: rgba(255,255,255,0.62);

                    cursor: pointer;

                    transition: all 0.22s ease;
                }

                .icon-btn:hover {
                    color: #C4A8FF;
                    border-color: rgba(196,168,255,0.2);
                    background: rgba(196,168,255,0.08);
                    transform: translateY(-1px);
                }

               .story-content {
    position: relative;
    z-index: 1;

    font-family: 'Cormorant Garamond', serif;

    line-height: 2;
    letter-spacing: 0.01em;

    color: ${
        darkMode
            ? "rgba(255,255,255,0.78)"
            : "rgba(0,0,0,0.82)"
    };

    animation: fadeUp 0.75s 0.1s cubic-bezier(0.22,1,0.36,1) both;
}

.story-paragraph {
    position: relative;

    margin-bottom: 2rem;

    padding: 1.35rem 1.5rem;

    border-radius: 18px;

    color: ${
        darkMode
            ? "rgba(255,255,255,0.74)"
            : "rgba(0,0,0,0.82)"
    };

    transition:
        background 0.3s ease,
        opacity 0.3s ease,
        filter 0.3s ease,
        transform 0.3s ease;
}

                .story-paragraph:hover {
    background: ${
        darkMode
            ? "rgba(255,255,255,0.02)"
            : "rgba(0,0,0,0.03)"
    };
}
.active-para {
    background:
        ${
            darkMode
                ? `
                linear-gradient(
                    135deg,
                    rgba(196,168,255,0.08),
                    rgba(196,168,255,0.02)
                )
                `
                : `
                linear-gradient(
                    135deg,
                    rgba(157,120,242,0.10),
                    rgba(157,120,242,0.03)
                )
                `
        };
                .active-sentence {
                    background:
                        rgba(196,168,255,0.18);

                    color: #fff;

                    padding: 3px 6px;

                    border-radius: 8px;

                    transition: all 0.22s ease;
                }

                @keyframes wave {
                    0%,100% {
                        transform: scaleY(0.5);
                    }

                    50% {
                        transform: scaleY(1.5);
                    }
                }

                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {

                    .story-container {
                        padding: 2rem 1rem 5rem;
                    }

                    .story-title {
                        font-size: clamp(2rem, 8vw, 3rem);
                    }

                    .control-panel {
                        top: 60px;
                    }

                    .story-paragraph {
                        padding: 1rem;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default StoryPage;