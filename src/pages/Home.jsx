import Navbar from '../component/Navbar';
import FeatureStories from '../component/FeatureStories';
import '../App.css';

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero / Intro */}
      <section className="intro">
        {/* Ambient glow blobs */}
        <div className="intro-blob intro-blob--left" />
        <div className="intro-blob intro-blob--right" />

        {/* Fine horizontal rule texture */}
        <div className="intro-texture" />

        <div className="intro-inner">
          {/* Eyebrow label */}
          <span className="intro-eyebrow">— curated collection</span>

          {/* Quote */}
          <h1 className="intro-quote">
            "Stories of human connection,{' '}
            <em>small moments,</em>{' '}
            and the warmth of the heart"
          </h1>

          {/* Decorative rule */}
          <div className="intro-rule" />

          {/* Sub-caption */}
          <p className="intro-caption">
            A quiet corner for stories that stay with you.
          </p>
        </div>
      </section>

      {/* Featured stories */}
      <FeatureStories />
    </>
  );
};

export default Home;