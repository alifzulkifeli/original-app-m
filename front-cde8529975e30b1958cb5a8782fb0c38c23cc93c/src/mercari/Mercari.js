import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {M_Search, Item1} from './apiMercari';

const M_Product = () => {
    useEffect(() => {
       
    }, []);

    return (
        <Layout
            title="Shop from Mercari"
            description="Get item directly from the largest preloved site at japan"
            className="container-fluid"
        >
            <M_Search />
            <h2>Famous Item</h2>
            <h4 className="text-center">G-SHOCK</h4>
            <Item1 name='casiogshock'/>
            <h4 className="text-center  mt-3">BAG</h4>
            <Item1 name='gregory'/>
            <h4 className="text-center  mt-3">SHIRT</h4>
            <Item1 name='duck dude'/>
            <h4 className="text-center  mt-3">CAP</h4>
            <Item1 name='new era'/><h4 className="text-center  mt-3">BATHING APE</h4>
            <Item1 name='bathing ape'/>
           
        </Layout>
    );
};

export default  M_Product;


/* jam 
gregory
duck dude
new era
bodykit car */
