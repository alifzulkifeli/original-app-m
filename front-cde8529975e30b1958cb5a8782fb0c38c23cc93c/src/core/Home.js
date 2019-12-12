import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    // eslint-disable-next-line
    const [error, setError] = useState(false);

 

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
       
    }, []);

    return (
        <Layout
            title="Welcome to TOPH"
            description="The Best Way to Shopping In Japan"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

        
        </Layout>
    );
};

export default Home;
