import React from 'react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from 'styled-components';




// Destructure star, reviews props
const Star = ({ stars, reviews }) => {

  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    // we add 0.5 in index to get half star above 0.5, 1.5, 2.5, ..... 
    let number = index + 0.5 ;

    // debugger is mainly used to find error and check how any code is working 
    // debugger

    return (
      <span key={index}>
        {/* stars value is in API  and index is current value index 
           index = 0  to index = 4      as length : 5 in above
        */}
        { stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });


  return (
    <Wrapper>
      <div className="icon-style">
        {ratingStar}
        <p>({reviews} customer reviews)</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 2rem;
      color: orange;
    }

    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;

export default Star;
