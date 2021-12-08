import React, { Component } from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';


export class Products extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ean: "3240931545066",
      products: [
        /* {
          brands: "Perrier",
          generic_name_fr: "Boisson bio énergisante, gazeuse avec infusion de maté intense et caféine, aromatisée (saveur grenade)",
          product_name_fr: "Boisson Energisante BIO saveur grenade",
          _id: "7613287168405",
          image_small_url: "https://images.openfoodfacts.org/images/products/761/328/716/8405/front_fr.14.200.jpg",
          image_thumb_url: "https://images.openfoodfacts.org/images/products/761/328/716/8405/front_fr.14.100.jpg",
          image_url: "https://images.openfoodfacts.org/images/products/761/328/716/8405/front_fr.14.400.jpg",
          nutriscore_grade: "c",
          nutriscore_score: 4,

        }, */

      ]

    }
    this.handleChange = this.handleChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }



  deleteProduct(product){
    //Supprimer produit
    localStorage.removeItem(product._id);
    this.setState(state => {
      const list = state.products.filter(function(el) { return el._id != product._id; });
      console.log(list)
      return {
        ean: state.ean,
        products: list
      };
    });
    
  }

  handleChange(event) {
    this.setState({ ean: event.target.value });
  }

  addProduct() {
    // recupérer la valeur du EAN à partir de l'input
    console.log(this.state.ean)



    //rechercher via l'API

    var url = 'https://fr.openfoodfacts.org/api/v0/product/' + this.state.ean + '.json'
    axios.get(url)
      .then(response => {
        console.log(response.data.product)
        // Stocker au niveau du Local Storage
        localStorage.setItem(this.state.ean, JSON.stringify(response.data.product));

        // ajouter le nouveau produit au tableau products 
        this.setState(state => {
          const list = state.products.concat(response.data.product);
          return {
            ean: state.ean,
            products: list
          };
        });
      })
  }
  render() {
    return (
      <div>
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Recipient's username" value={this.state.ean} onChange={this.handleChange}></input>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.addProduct()} >Ajouter</button>
          </div>
        </div>

        <div className="row">
          {this.state.products.map(product => (
            <div className="col-md-3">
              <div className="card">
                {/*  <img className="card-img-top" src={product.image_url} width="auto" height="50%" alt="" /> */}
                <img src={product.image_url} className="card-img-top" width="auto" height="50%" alt="..." />
                <div className="card-body">
                  <h2 className="card-title">{product.product_name_fr}</h2>
                  <h1 className="card-title">{product.brands}</h1>
                  <h1 className="card-title">{product.nutriscore_grade}</h1>

                  <p className="card-text">
                    <a href="#" onClick={()=>this.deleteProduct(product)} className="btn btn-danger">Supprimer</a>

                  </p>
                </div>
              </div>
            </div>


          ))}
        </div>
      </div>
    )
  }
}

export default Products
