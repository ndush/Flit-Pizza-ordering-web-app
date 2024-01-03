import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="flex flex-wrap" style={{ marginTop: "40px" }}>
        <div className="flex-1 md:w-1/4">
          <h5 style={{ fontSize: "small" }}>INFORMATION</h5>
          <div>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Menu</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 md:w-1/4">
          <h5 style={{ fontSize: "small" }}>TOP ITEMS</h5>
          <div>
            <ul>
              <li>
                <a href="#">Pepperoni</a>
              </li>
              <li>
                <a href="#">Swiss Mushroom</a>
              </li>
              <li>
                <a href="#">Barbeque Chicken </a>
              </li>
              <li>
                <a href="#">Vegetarian</a>
              </li>
              <li>
                <a href="#">Ham & Cheese</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 md:w-1/4">
          <h5 style={{ fontSize: "small" }}>OTHERS</h5>
          <div>
            <ul>
              <li>
                <a href="#">Checkout</a>
              </li>
              <li>
                <a href="#">Cart</a>
              </li>
              <li>
                <a href="#">Product</a>
              </li>
              <li>
                <a href="#">Locations</a>
              </li>
              <li>
                <a href="#">Legal</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 md:w-1/4">
          <h5 style={{ fontSize: "small" }}>SOCIAL MEDIA</h5>
          <div>
            <div className="flex">
              <img src="/images/ff.png" className="w-8 h-8 mr-4" />
              <img src="/images/ee.png" className="w-8 h-8 mr-4" />
              <img src="/images/hh.png" className="w-8 h-8 mr-4" />
              <img src="/images/gg.png" className="w-8 h-8" />
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

            <Link
              href="/adminlogin"
              style={{
                backgroundColor: "#f8cc17",
                color: "white",
                padding: "10px 20px",
                marginTop: "5px",
                textDecoration: "none",
                fontSize: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                borderRadius: "10px",
                display: "inline-block",
              }}
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
