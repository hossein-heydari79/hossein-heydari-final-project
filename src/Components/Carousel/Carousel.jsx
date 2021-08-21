import React, { useState, useEffect } from 'react'
import { Carousel } from "react-bootstrap";
import photo from "../../Assets/caraselPhone.jpg";
import tablet from "../../Assets/caraselTablet.jpg";
import laptop from "../../Assets/caraselLaptop.webp";

const MyCarousel = () => {
    const [windowWidth, setWindowWith] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWith(window.innerWidth);
        });
    }, []);

    return (
        <div
            className="d-flex p-1"
            style={{ width: `${windowWidth < 992 ? 100 : 70}%` }}
        >
            <Carousel className="w-100 rounded">
                <Carousel.Item>
                    <img
                        style={{ borderRadius: "10px" }}
                        className="d-block w-100"
                        src={tablet}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{ borderRadius: "10px" }}
                        className="d-block w-100 h-100"
                        src={photo}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{ borderRadius: "10px" }}
                        className="d-block w-100"
                        src={laptop}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}


export default MyCarousel;