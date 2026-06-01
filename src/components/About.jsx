import React, { useEffect, useState } from 'react';

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const aboutImage = document.getElementById('about-image');
    if (aboutImage) observer.observe(aboutImage);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <div className="about-content">
        <div className="about-text">
          <h2>Your Trusted Gas Partner in Lagos</h2>
          <p>Blue Flame Gas Supply Limited is a leading LPG gas supplier committed to providing safe, reliable, and affordable gas solutions to homes and businesses across Lagos State.</p>
          <p>With years of experience and a dedication to customer satisfaction, we ensure every delivery meets the highest safety standards. Our team is trained to handle gas cylinders with care and professionalism.</p>
          <p><strong>📍 Location:</strong> Blue Flame Gas Depot, Uba Pharmacy Road, Awoyaya, Ibeju-Lekki, Lagos State</p>
        </div>
        <div id="about-image" className={`about-image ${isVisible ? 'visible' : ''}`}>
          <div className="image-content">
            <h3>🚛 Fast & Reliable</h3>
            <p>Same-Day Gas Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
