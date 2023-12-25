import React from "react";
import "../Footer/Footer.css";
import LogoFooter from "../../../assets/furni logo.jpg";

const Footer = () => {
  return (
    <div className="containerfooter">
      <div className="icondisclaimer">
        <img src={LogoFooter} alt="LogoFooter" />
        <p>
        It is an independent Frontend project.</p>
          <a href="https://www.figma.com/@sicleteam" target="__blank"> Figma </ a>
         <p> And in Coding By</p>
          <a href="https://github.com/arul4902" target="__blank"> github </a>
          <br />
          <a href="https://github.com/arul4902" target="_blank">arul4902</a>
        
      </div>
      <div className="menufooter">
        <div className="product">
          <h4>Product</h4>
          <ul>
            <li>
              <a href="">New Arrivals</a>
            </li>
            <li>
              <a href="">Best Selling</a>
            </li>
            <li>
              <a href="">Home Decor</a>
            </li>
            <li>
              <a href="">Kitchen Set</a>
            </li>
          </ul>
        </div>

        <div className="service">
          <h4>Service</h4>
          <ul>
            <li>
              <a href="">Catalog</a>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
            <li>
              <a href="">FaQ</a>
            </li>
            <li>
              <a href="">Pricing</a>
            </li>
          </ul>
        </div>

        <div className="followus">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="">Facebook</a>
            </li>
            <li>
              <a href="">Instagram</a>
            </li>
            <li>
              <a href="">Twitter</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
