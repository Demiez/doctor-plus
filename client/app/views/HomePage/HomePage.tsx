import * as React from 'react';
import homePageImg from '../../../assets/images/home_page_bg.jpg';
import '../../../assets/styles';

export const HomePage: React.FC = () => {
  return (
    <section className="homepage">
      <div className="homepage-info-one">Home Page</div>
      <div>
        <img src={homePageImg} alt="Home Page Image" />
      </div>
      <div className="homepage-info-two">Welcome to Doctor Plus</div>
    </section>
  );
};
