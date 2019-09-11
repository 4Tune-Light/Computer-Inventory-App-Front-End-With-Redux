import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProduct } from '../../redux/actions/productActions';
import { getCategories } from '../../redux/actions/categoryActions';


import NavigationBar from '../headers/navbar/Navbar';

class CreateProducts extends Component {
	state = {
		name: '',
		image: '',
		id_category: 0,
		quantity: 0,
		description: ''
	}

	componentDidMount() {
		this.props.getCategories();
	}

	createData = e => {
		this.setState({ [e.target.name]: e.target.value})
	}

	createSubmit = e => {
		e.preventDefault();
		const newData = this.state;
		this.props.createProduct(newData, this.props.user);
	}

	render() {
		const { categories } = this.props.category;

		if (this.props.product.isRedirected) {
			return(<Redirect to='/products/' />)
		} else {
			return (
				<div>
				<NavigationBar user={this.props.user}/>
				<div className="container-fluid">
					<div className="user-form my-5">
						<h3>Create Products</h3><hr/>
						<form>
						  <div className="form-group">
						    <label htmlFor="Name">Product Name</label>
						    <input type="text" value={this.state.name} className="form-control" name="name" id="Name" placeholder="Product Name" onChange={this.createData} />
						  </div>
						  <div className="form-group">
						    <label htmlFor="Image">Image (URL)</label>
						    <input type="text" value={this.state.image} className="form-control" name="image" id="Image" placeholder="Image (URL)" onChange={this.createData} />
						  </div>
						  <div className="form-group">
						    <label htmlFor="Category">Select Category</label>
						    <select className="form-control" id="Category" name="id_category" onChange={this.createData}>
						      {
										categories.map(category => {
											return <option value={category.id} key={category.id}>{category.name}</option>
										})
									}
						    </select>
						  </div>
						  <div className="form-group">
						    <label htmlFor="Qauntity">Quantity</label>
						    <input type="number" value={this.state.quantity} className="form-control" name="quantity" id="Quantity" placeholder="Quantity" onChange={this.createData} />
						  </div>
						  <div className="form-group">
						    <label htmlFor="Description">Description</label>
						    <textarea className="form-control" value={this.state.description} name="description" id="Description" rows="5" placeholder="Product Description" onChange={this.createData}></textarea>
						  </div>
						  <div className="form-group">
						  	<button type="submit" onClick={this.createSubmit} className="btn btn-primary form-control py-2"><b>Create</b></button>
						  </div>
						</form>
					</div>
				</div>
				</div>
			)
		}
	}
}

const mapStateToProps = state => ({
	category: state.category,
	user: state.user
})

export default connect(mapStateToProps, { createProduct, getCategories })(CreateProducts);