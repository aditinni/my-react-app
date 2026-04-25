import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import stories from "../stories/stories.js";
import { useNavigate } from "react-router-dom";
import "../App.css";

const FeatureStories = () => {
    const navigate = useNavigate();

    const featuredStory = stories.find((s) => s.id === 1);

    return (
        <>
            {featuredStory && (
                <div className="cards">
                    <div className="first-card">
                        <div className="story-detail-flex">
                            <h1>{featuredStory.title}</h1>
                            <p>{featuredStory.description}</p>

                            <div className="genre-flex">
                                {featuredStory.genre.map((item, i) => (
                                    <Chip key={i} label={item} />
                                ))}
                            </div>

                            <Button
                                variant="contained"
                                sx={{
                                    width: "25%",
                                    backgroundColor: "var(--button-bg-color)",
                                    fontFamily: "Google Sans, sans-serif",
                                }}
                                onClick={() =>
                                    navigate(`/story/${featuredStory.id}`)
                                }
                            >
                                Read
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="stories-wrapper">
                {stories
                    .filter((s) => s.id !== 1)
                    .map((item) => (
                        <div key={item.id} className="first-card">
                            <div className="story-detail-flex">
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>

                                <div className="genre-flex">
                                    {item.genre.map((g, i) => (
                                        <Chip key={i} label={g} />
                                    ))}
                                </div>

                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor:
                                            "var(--button-bg-color)",
                                        fontFamily:
                                            "Google Sans, sans-serif",
                                        width: "100%",
                                    }}
                                    onClick={() =>
                                        navigate(`/story/${item.id}`)
                                    }
                                >
                                    Read
                                </Button>
                            </div>

                
                        </div>
                    ))}
            </div>
        </>
    );
};

export default FeatureStories;