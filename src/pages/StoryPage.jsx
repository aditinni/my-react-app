import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import confetti from "canvas-confetti";

const StoryPage = () => {
    const { id } = useParams();

    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(1.2);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [activeIndex, setActiveIndex] = useState(null);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);


    const speechRef = useRef(null);

    const getGenreStyle = (genre, darkMode) => {
    const base = {
        fontWeight: 600,
        color: "#fff",
        border: "none",
        transition: "0.3s ease",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
    };

    switch (genre.toLowerCase()) {
        case "romance":
            return {
                ...base,
                background: "linear-gradient(135deg, #ff6b9d, #ff9a8b)",
                boxShadow: "0 0 12px rgba(255, 107, 157, 0.6)"
            };

        case "horror":
            return {
                ...base,
                background: "linear-gradient(135deg, #2c3e50, #000000)",
                boxShadow: "0 0 12px rgba(0, 0, 0, 0.8)"
            };

        case "relationship":
            return {
                ...base,
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                boxShadow: "0 0 12px rgba(106, 17, 203, 0.6)"
            };

        case "family":
            return {
                ...base,
                background: "linear-gradient(135deg, #ff512f, #dd2476)",
                boxShadow: "0 0 12px rgba(221, 36, 118, 0.6)"
            };

        case "nostalgia":
            return {
                ...base,
                background: "linear-gradient(135deg, #7f00ff, #e100ff)",
                boxShadow: "0 0 12px rgba(127, 0, 255, 0.6)"
            };

        case "emotional":
            return {
                ...base,
                background: "linear-gradient(135deg, #3a7bd5, #3a6073)",
                boxShadow: "0 0 12px rgba(58, 123, 213, 0.6)"
            };

        default:
            return {
                ...base,
                background: darkMode
                    ? "linear-gradient(135deg, #444, #222)"
                    : "linear-gradient(135deg, #999, #777)"
            };
    }
};

    /* LOAD STORY */
    useEffect(() => {
        setLoading(true);

        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setActiveIndex(null);
        setProgress(0);
        setCompleted(false);

        const found = stories.find((s) => s.id === Number(id));
        setStory(found || null);

        setTimeout(() => {
            setLoading(false);
        }, 400);

        window.scrollTo(0, 0);

        return () => window.speechSynthesis.cancel();
    }, [id]);

    /* PROGRESS */
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

    /* CONFETTI */
    useEffect(() => {
        if (progress > 98 && !completed) {
            setCompleted(true);

            const duration = 500;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 6,
                    spread: 90,
                    startVelocity: 35,
                    origin: {
                        x: Math.random(),
                        y: Math.random() * 0.6
                    }
                });

                if (Date.now() < end) requestAnimationFrame(frame);
            };

            frame();
        }
    }, [progress, completed]);

    /* AUDIO */
    const handleSpeak = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const utterances = story.content.map((text, index) => {
            const u = new SpeechSynthesisUtterance(text);
            u.rate = speed;
            u.onstart = () => setActiveIndex(index);
            return u;
        });

        utterances.forEach((u, i) => {
            if (i < utterances.length - 1) {
                u.onend = () =>
                    window.speechSynthesis.speak(utterances[i + 1]);
            } else {
                u.onend = () => {
                    setIsSpeaking(false);
                    setActiveIndex(null);
                };
            }
        });

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterances[0]);
        setIsSpeaking(true);
    };

    /* FULLSCREEN */
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullScreen(true);
        } else {
            document.exitFullscreen();
            setFullScreen(false);
        }
    };

    /* LOADING SKELETON */
    if (loading) {
        return (
            <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
                <div style={{
                    height: "30px",
                    width: "60%",
                    background: "#ddd",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    animation: "pulse 1.5s infinite"
                }} />

                <div style={{
                    height: "300px",
                    width: "100%",
                    background: "#ddd",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    animation: "pulse 1.5s infinite"
                }} />

                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        style={{
                            height: "14px",
                            width: `${80 - i * 10}%`,
                            background: "#ddd",
                            borderRadius: "6px",
                            marginBottom: "10px",
                            animation: "pulse 1.5s infinite"
                        }}
                    />
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
    }

    if (!story) {
        return <h2 style={{ textAlign: "center" }}>Story Not Found</h2>;
    }

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
            {!fullScreen && <Navbar />}

            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "4px",
                width: `${progress}%`,
                background: "#CC7A6B",
                zIndex: 9999
            }} />

            <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
                <h1>{story.title}</h1>

                <img
                    src={story.image}
                    style={{
                        width: "100%",
                        borderRadius: "12px",
                        margin: "1rem 0"
                    }}
                />

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {story.genre.map((g, i) => (
                       <Chip
        key={i}
        label={g}
        sx={getGenreStyle(g, darkMode)}
    />
                    ))}
                </div>

                {/* CONTROLS */}
                <div style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1rem",
                    alignItems: "center"
                }}>
                    <div onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </div>

                    <TextIncreaseIcon onClick={() => setFontSize(p => Math.min(p + 0.1, 1.8))} />
                    <TextDecreaseIcon onClick={() => setFontSize(p => Math.max(p - 0.1, 1))} />

                    {fullScreen ? (
                        <FullscreenExitIcon onClick={toggleFullScreen} />
                    ) : (
                        <FullscreenIcon onClick={toggleFullScreen} />
                    )}
                </div>

                {/* AUDIO */}
                <div style={{
                    marginTop: "1.5rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center"
                }}>
                    <div onClick={handleSpeak}>
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
                        <p key={i} style={{
                            padding: "10px",
                            borderRadius: "8px",
                            background: activeIndex === i
                                ? darkMode ? "#1e1e1e" : "#f1f1f1"
                                : "transparent"
                        }}>
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            <style>
                {`
                @keyframes wave {
                    0%,100%{transform:scaleY(0.6)}
                    50%{transform:scaleY(1.4)}
                }
                `}
            </style>
        </div>
    );
};

export default StoryPage;