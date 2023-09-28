import React from 'react'
import IntroSection from '../component/IntroSection';
import Services from '../component/Services';
import Partners from '../component/Partners';
import FeatureProducts from '../component/FeatureProducts';

const Home = () => {

  const data = {
      name :"Store"
  }


  return (
   <>
     <IntroSection myData={data} />
     <FeatureProducts/>
     <Services/>
     <Partners/> 
   </>
  )
};

export default Home