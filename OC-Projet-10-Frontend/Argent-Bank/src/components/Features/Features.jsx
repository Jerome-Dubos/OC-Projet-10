import React from 'react';
import iconChat from '../../img/icon-chat.png';
import iconMoney from '../../img/icon-money.png';
import iconSecurity from '../../img/icon-security.png';
import './Features.css'

const Features = () => (
  <section className="features">
    <h2 className="sr-only">Features</h2>
    <div className="feature-item">
      <img src={iconChat} alt="Feature Icon" className="feature-icon" />
      <h3 className="feature-item-title">You are our #1 priority</h3>
      <p>Get in touch through our 24/7 chat or phone.</p>
    </div>
    <div className="feature-item">
      <img src={iconMoney} alt="Feature Icon" className="feature-icon" />
      <h3 className="feature-item-title">More savings means higher rates</h3>
      <p>The more you save, the higher your rate.</p>
    </div>
    <div className="feature-item">
      <img src={iconSecurity} alt="Feature Icon" className="feature-icon" />
      <h3 className="feature-item-title">Security you can trust</h3>
      <p>Top encryption keeps your data and money safe.</p>
    </div>
  </section>
);

export default Features;