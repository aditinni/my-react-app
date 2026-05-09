import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import stories from "../stories/stories.js";
import { useNavigate } from "react-router-dom";
import "../App.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const FeatureStories = () => {
  const navigate = useNavigate();
  const featuredStory = stories.find((s) => s.id === 1);
  const otherStories = stories.filter((s) => s.id !== 1);

  return (
    <section className="feature-section">

      {/* ── Section header ── */}
      <div className="feature-header">
        <span className="feature-eyebrow">— featured</span>
        <h2 className="feature-heading">Stories worth reading</h2>
      </div>

      {/* ── Featured card ── */}
      {featuredStory && (
        <div className="featured-card">
          {/* Badge */}
          <span className="featured-badge">Featured Story</span>

          <div className="featured-body">
           

            <h2 className="featured-title">{featuredStory.title}</h2>
            <p className="featured-desc">{featuredStory.description}</p>

            <div className="chip-row">
              {featuredStory.genre.map((item, i) => (
                <Chip
                  key={i}
                  label={item}
                  size="small"
                  sx={chipStyles}
                />
              ))}
            </div>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
              onClick={() => navigate(`/story/${featuredStory.id}`)}
              sx={readBtnStyles}
            >
              Read Story
            </Button>
          </div>

          {/* Decorative glow */}
          <div className="featured-glow" />
        </div>
      )}

      {/* ── Section divider ── */}
      <div className="section-divider">
        <div className="divider-line" />
        <span className="divider-label">More Stories</span>
        <div className="divider-line" />
      </div>

      {/* ── Story grid ── */}
      <div className="story-grid">
        {otherStories.map((item, index) => (
          <div
            key={item.id}
            className="story-card"
            style={{ animationDelay: `${index * 0.07}s` }}
          >

            <h3 className="story-card-title">{item.title}</h3>
            <p className="story-card-desc">{item.description}</p>

            <div className="chip-row">
              {item.genre.map((g, i) => (
                <Chip key={i} label={g} size="small" sx={chipStyles} />
              ))}
            </div>

            <button
              className="story-card-btn"
              onClick={() => navigate(`/story/${item.id}`)}
            >
              Read
              <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </button>
          </div>
        ))}
      </div>

    </section>
  );
};

/* ── MUI overrides ─────────────────────────── */
const chipStyles = {
  fontFamily: "'DM Mono', monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.08em",
  height: "22px",
  color: "rgba(196,168,255,0.8)",
  background: "rgba(196,168,255,0.08)",
  border: "1px solid rgba(196,168,255,0.18)",
  borderRadius: "6px",
  "& .MuiChip-label": { px: "8px" },
};

const readBtnStyles = {
  mt: 1,
  px: 3,
  py: 1.1,
  fontFamily: "system-ui, sans-serif",
  fontSize: "0.82rem",
  fontWeight: 600,
  letterSpacing: "0.03em",
  textTransform: "none",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #9D78F2, #7254D4)",
  boxShadow: "0 6px 20px rgba(130,90,255,0.28)",
  border: "1px solid rgba(196,168,255,0.15)",
  alignSelf: "flex-start",
  transition: "all 0.22s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #AB8CF5, #8264E0)",
    transform: "translateY(-1px)",
    boxShadow: "0 10px 28px rgba(130,90,255,0.4)",
  },
  "&:active": { transform: "scale(0.97)" },
};

export default FeatureStories;