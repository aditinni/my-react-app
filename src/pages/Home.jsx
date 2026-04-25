import Navbar from '../component/Navbar'
import FeatureStories from '../component/FeatureStories'
import IntroImage from '../assets/intro-img.png'
import '../App.css'
const Home = ()=>{
    return(
        <>
        <Navbar/>
        <div className='intro'>
        <div className='intro-flex'>
        <h1>"Stories of human connection, small moments, and the warmth of the heart"</h1>
        <img src={IntroImage} alt="intro-img" className="intro-img" />
        </div>
        </div>
        <FeatureStories/>
        </>
    )
}

export default Home