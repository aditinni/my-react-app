import Navbar from '../component/Navbar'
import FeatureStories from '../component/FeatureStories'
import '../App.css'
import { useEffect, useState } from "react";
import HomeSkeleton from "../component/HomeSkeleton";

const Home = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const imagesToLoad = [
            "https://aditinni.github.io/my-react-app/intro-img.png",
            // add feature story images here too if needed
        ];

        let loadedCount = 0;

        imagesToLoad.forEach((src) => {
            const img = new Image();
            img.src = src;

            img.onload = () => {
                loadedCount++;

                if (loadedCount === imagesToLoad.length) {
                    setLoading(false);
                }
            };

            img.onerror = () => {
                loadedCount++;

                if (loadedCount === imagesToLoad.length) {
                    setLoading(false);
                }
            };
        });

    }, []);

    if (loading) {
        return <HomeSkeleton />;
    }

    return (
        <>
            <Navbar />

            <div className='intro'>
                <div className='intro-flex'>
                    <h1>
                        "Stories of human connection, small moments, and the warmth of the heart"
                    </h1>

                    <img
                        src="https://aditinni.github.io/my-react-app/intro-img.png"
                        alt="intro-img"
                        className="intro-img"
                    />
                </div>
            </div>

            <FeatureStories />
        </>
    );
};

export default Home;