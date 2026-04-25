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

    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(1.2);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [activeIndex, setActiveIndex] = useState(null);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    const speechRef = useRef(null);

    useEffect(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setActiveIndex(null);
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

    /* 🎆 CONFETTI ON COMPLETION */
    useEffect(() => {
        if (progress > 98 && !completed) {
            setCompleted(true);

            const duration = 2000;
            const end = Date.now() + duration;

            const colors = ["#ff0000", "#ffcc00", "#00ffcc", "#ff66ff", "#ffffff"];

            const frame = () => {
                confetti({
                    particleCount: 6,
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
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>❌ Story Not Found</h2>
            </div>
        );
    }

    const handleSpeak = () => {
        window.speechSynthesis.cancel();

        if (isSpeaking) {
            setIsSpeaking(false);
            return;
        }

        const utterances = story.content.map((text, index) => {
            const u = new SpeechSynthesisUtterance(text);
            u.rate = speed;
            u.onstart = () => setActiveIndex(index);
            return u;
        });

        setIsSpeaking(true);

        utterances.forEach((u, i) => {
            if (i < utterances.length - 1) {
                u.onend = () => window.speechSynthesis.speak(utterances[i + 1]);
            } else {
                u.onend = () => setIsSpeaking(false);
            }
        });

        window.speechSynthesis.speak(utterances[0]);
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
        <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
            {[...Array(28)].map((_, i) => (
                <span
                    key={i}
                    style={{
                        width: "3px",
                        height: active ? `${8 + (i % 6) * 2}px` : "6px",
                        background: active ? "#CC7A6B" : "#999",
                        borderRadius: "2px",
                        animation: active ? "wave 1s infinite ease-in-out" : "none",
                        animationDelay: `${i * 0.05}s`
                    }}
                />
            ))}
        </div>
    );

    const speedBtnStyle = (val) => ({
        padding: "4px 8px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.8rem",
        background: speed === val
            ? "#CC7A6B"
            : darkMode ? "#2a2a2a" : "#e0e0e0",
        color: speed === val ? "#fff" : darkMode ? "#e5e5e5" : "#333"
    });

    return (
        <div style={{
            background: darkMode ? "#121212" : "#fdfbf7",
            color: darkMode ? "#e5e5e5" : "#2D3748",
            minHeight: "100vh"
        }}>

            <Navbar />

            {/* 🔥 PROGRESS BAR (NEW) */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "4px",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #ff4d4d, #ffcc00, #00ffcc)",
                    zIndex: 9999,
                    transition: "width 0.2s ease"
                }}
            />

            <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>

                <h1>{story.title}</h1>

                <div style={{ marginBottom: "14px" }} />

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {story.genre.map((g, i) => (
                        <Chip key={i} label={g} />
                    ))}
                </div>

                {/* CONTROLS */}
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", alignItems: "center" }}>
                    <div onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </div>

                    <TextIncreaseIcon onClick={() => setFontSize(p => Math.min(p + 0.1, 1.8))} />
                    <TextDecreaseIcon onClick={() => setFontSize(p => Math.max(p - 0.1, 1))} />

                    <FullscreenIcon onClick={toggleFullScreen} />
                </div>

                {/* AUDIO */}
                <div style={{
                    marginTop: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem"
                }}>
                    <div onClick={handleSpeak} style={{ cursor: "pointer" }}>
                        {isSpeaking ? <PauseIcon /> : <PlayArrowIcon />}
                    </div>

                    <Waveform active={isSpeaking} />

                    <div style={{ display: "flex", gap: "6px" }}>
                        <span style={speedBtnStyle(0.75)} onClick={() => setSpeed(0.75)}>0.75x</span>
                        <span style={speedBtnStyle(1)} onClick={() => setSpeed(1)}>1x</span>
                        <span style={speedBtnStyle(1.5)} onClick={() => setSpeed(1.5)}>1.5x</span>
                    </div>
                </div>

                {/* STORY */}
                <div style={{
                    marginTop: "2rem",
                    fontSize: `${fontSize}rem`,
                    lineHeight: 2,
                    fontFamily: "Georgia, serif"
                }}>
                    {story.content.map((para, i) => (
                        <p
                            key={i}
                            style={{
                                padding: "10px",
                                borderRadius: "8px",
                                background: activeIndex === i
                                    ? darkMode ? "#1e1e1e" : "#f1f1f1"
                                    : "transparent"
                            }}
                        >
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            <style>
                {`
                @keyframes wave {
                    0%, 100% { transform: scaleY(0.6); }
                    50% { transform: scaleY(1.4); }
                }
                `}
            </style>
        </div>
    );
};

export default StoryPage;