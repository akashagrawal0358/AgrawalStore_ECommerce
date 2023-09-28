import IntroSection from '../component/IntroSection'
import { useProductContext } from  '../contexts/productContext'

const About = () => {

  const {myName }= useProductContext();

  const data = {
    name : "Commerce"
  }

  return (
      <>
      {myName}
      <IntroSection myData={data}/>
      </>
       
  )
}

export default About