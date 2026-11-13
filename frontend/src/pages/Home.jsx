import React,{useState} from 'react'
import Hero from '../components/Hero';
import ExploreManu from '../components/ExploreManu';
import Menu from "../pages/Manu"
import AboutSection from '../components/AboutSection';
import FoodDisplay from '../components/FoodDisplay';
const Home = () => {
   const [Category,setCategory] = useState('All')

  return (
    <div>
      <Hero/>
     <ExploreManu Category ={Category} setCategory={setCategory}/>
     <FoodDisplay/>
     <Menu/>
     <AboutSection/>
    </div>
  )
}

export default Home;