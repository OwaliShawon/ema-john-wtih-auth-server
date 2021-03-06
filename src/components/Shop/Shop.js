import React, { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     fetch('https://afternoon-brushlands-06023.herokuapp.com/products')
    //         .then(response => response.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(() => {
        fetch('https://afternoon-brushlands-06023.herokuapp.com/products?search=' + search)
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [search])

    const handleSearch = event => {
        setSearch(event.target.value);
        // console.log(search);
    }


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(products, productKeys);
        fetch('https://afternoon-brushlands-06023.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(response => response.json())
            .then(data => setCart(data))
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div>
            <div>
                <div className="input-group d-flex justify-content-center mt-3">
                    <div className="form-outline">
                        <input onChange={handleSearch} type="search" id="form1" class="form-control" />
                        <label className="form-label d-flex  justify-content-center" for="form1">Search Product</label>
                    </div>
                    {/* <button type="button" className="btn btn-primary">
                        <i className={"fas fa-search"} ></i>
                    </button> */}
                </div>
            </div>

            <div className="twin-container">
                <div className="product-container">
                    {
                        products.map(pd =>
                            <Product
                                key={pd.key}
                                showAddToCart={true}
                                handleAddProduct={handleAddProduct}
                                product={pd}
                            ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="main-button">Review Order</button>
                        </Link>
                    </Cart>
                </div>

            </div>
        </div>
    );
};

export default Shop;