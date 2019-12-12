import React from "react";
import { API } from "../config";
import ReactDOM from "react-dom";
import '../styles.css'

const ShowImage = ({ item}) => (
    <div className="product-img box text-center img-fluid alligator-turtle"  >
        <img
            src={`${item.image1}`}
            alt={item.name}
            className="mb-3 img-fluid "
            
        />
    </div>
);

export default ShowImage;
