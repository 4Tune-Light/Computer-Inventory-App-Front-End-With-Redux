import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProduct, updateProduct } from '../../redux/actions/productActions';
import { getCategories } from '../../redux/actions/categoryActions';



import NavigationBar from '../headers/navbar/Navbar';

class EditProducts extends Component {
	state = {
		name: '',
		image: '',
		id_category: 0,
		quantity: 0,
		description: ''
	}

	async componentDidMount() {
		await this.props.getCategories();
		await this.props.getProduct(this.props.match.params.id);

		this.setState(this.props.product.products);
	}

	editData = e => {
		this.setState({ [e.target.name]: e.target.value});
	}

	editSubmit = e => {
		e.preventDefault();
		const newData = this.state;
		this.props.updateProduct(this.props.match.params.id, newData, this.props.user);
	}

	render() {
		const { categories } = this.props.category;
		const { id, name, image, id_category, quantity, description } = this.state;
		if (this.props.product.isRedirected) {
			return(<Redirect to={"/products/" + id} />)
		} else {
			return (
				<div>
				<NavigationBar user={this.props.user} />
				<div className="container-fluid">
					<div className="user-form my-5">
						<h3>Edit Products</h3><hr/>
						<form>
						  <div className="form-group">
						    <label>Product Name</label>
						    <input type="text" className="form-control" value={name} name="name" id="Name" placeholder="Product Name" onChange={this.editData} />
						  </div>
						  <div className="form-group">
						    <label>Image (URL)</label>
						    <input type="text" className="form-control" value={image} name="image" id="Image" placeholder="Image (URL)" onChange={this.editData} />
						  </div>
						  <div className="form-group">
						    <label>Select Category</label>
						    <select className="form-control" id="Category" name="id_category" onChange={this.editData}>
						      {
										categories.map(category => {
											if (category.id === this.state.id_category) {
												return <option value={category.id} key={category.id} selected>{category.name}</option>
											} else {
												return <option value={category.id} key={category.id}>{category.name}</option>
											}
										})
									}
						    </select>
						  </div>
						  <div className="form-group">
						    <label>Quantity</label>
						    <input type="number" className="form-control" value={quantity} name="quantity" id="Quantity" placeholder="Quantity" onChange={this.editData} />
						  </div>
						  <div className="form-group">
						    <label>Description</label>
						    <textarea className="form-control" value={description} name="description" id="Description" rows="5" onChange={this.editData}></textarea>
						  </div>
						  <div className="form-group">
						  	<button type="button" onClick={this.editSubmit} className="btn btn-primary form-control py-2"><b>Edit</b></button>
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
	product: state.product,
	category: state.category,
	user: state.user
})

export default connect(mapStateToProps, { getProduct, updateProduct, getCategories })(EditProducts);