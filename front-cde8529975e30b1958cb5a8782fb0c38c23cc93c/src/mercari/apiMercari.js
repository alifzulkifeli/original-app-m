import { API } from "../config";
import React, { useState, useEffect } from "react";
import Card from '../core/Card';



export const M_Search = () => {
    localStorage.setItem('M_Search', JSON.stringify(''));
    let seachHistory = localStorage.getItem('M_Search').replace(/['"]+/g, '');
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: seachHistory,
        minPrice: "",
        maxPrice: "",
        results: [],
        searched: false
    });

    const [loading, setLoading] = useState(false)

    const {  category, search, results, searched,minPrice,maxPrice,page } = data;

    

    useEffect(() => {
 
    }, []);

    const list = params => {
    localStorage.setItem('M_Search', JSON.stringify(params.search));
    

    
      return fetch(`${API}/mercari/search?page=${page || 1}&min_price=${Math.trunc(minPrice/0.038)}&max_price=${Math.trunc(maxPrice/0.038)}&search=${search}`, {
          method: "GET"
      })
          .then(response => {
              return response.json();
          })
          .catch(err => console.log(err));
    };

    const searchData = () => {
        setLoading(true)
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                        setLoading(false)
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });    
    };

 

    const searchedProducts = (results = []) => {
        
        return (
            <div>
               

                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-4 mb-3">
                            <Card key={i} product={product} cartUpdate={false}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                        value={data.search}
                    />
                   
                </div>
                
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Search</button>
                </div>
                
            </span>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                   
                    <input
                        type="number"
                        className="form-control"
                        onChange={handleChange("minPrice")}
                        placeholder="minumum price"
                    />
                    <input
                        type="number"
                        className="form-control"
                        onChange={handleChange("maxPrice")}
                        placeholder="maximum price"
                    />
                     <input
                        type="number"
                        className="form-control"
                        onChange={handleChange("page")}
                        placeholder="page number"
                    />
                </div>         
            </span>
            
        </form>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
            <div className="container-fluid mb-3">
                {showLoading()}
                {searchedProducts(results)}
            </div>
        </div>
    );
};



export const Item1 = ({name}) => {
    const [data, setData] = useState({
        results: [],
    });
    const {  results} = data;
    useEffect(() => {   
        searchData()
    }, []);

    const list = haha => {
      return fetch(`${API}/mercari/search?page=1&search=${name}`, {
          method: "GET"
      })
          .then(response => {
              return response.json();
          })
          .catch(err => console.log(err));
    };

    const searchData = () => {
    
            list().then(
                res => {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        setData({ ...data, results: res.slice(0,8 )});       
                    }
                }
            );
            
            
        
    };
    const searchedProducts = (results = []) => {  
        return (
            <div>
                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
                            <Card key={i} product={product} cartUpdate={false}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    return (
        <div className="row">
            <div className="container-fluid mb-3">
                {searchedProducts(results)}             
            </div>
        </div>
    );
};

