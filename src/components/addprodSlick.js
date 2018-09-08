import React from 'react';
import Slider from 'react-slick';

const SampleNextArrow = props => {
  const { className, style, onClick } = props;
  return (
    // eslint-disable-next-line
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#c6b6b6' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    // eslint-disable-next-line
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#c6b6b6' }}
      onClick={onClick}
    />
  );
};

class addprodSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="container">
        <Slider {...settings}>
          <div>
            <img src='https://fashiongonerogue.com/wp-content/uploads/2012/12/icons3.jpg' width="250" height="250" alt="" />
          </div>
          <div>
            <img src='https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb2264421ec008a297430e9e25f94eb3&w=1000&q=80' width="250" height="250" alt="" />
          </div>
          <div>
            <img src='http://3.bp.blogspot.com/-OkqoImRlf4g/VMHmQOmoeeI/AAAAAAAAACs/lr9axi3dUoY/s1600/Fantasy%2Bhd%2Bwallpapers%2Bhd%2Bimagess%2B(5).jpg' width="250" height="250" alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}

export default addprodSlider;
