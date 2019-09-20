import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProduct, deleteProduct } from '../../redux/actions/productActions';
import PropTypes from 'prop-types';

import NavigationBar from '../headers/navbar/Navbar';

class SingleProducts extends Component {
	static propTypes = {
		getProduct: PropTypes.func.isRequired,
		product: PropTypes.object.isRequired,
	}

	componentDidMount() {
		this.props.getProduct(this.props.match.params.id);
	}

	deleteProduct = id => {
		this.props.deleteProduct(id, this.props.user);
	}

	render() {
		const { isLoading, products } = this.props.product;
		return (
			<div>
			<NavigationBar user={this.props.user} />
			<div className="container-fluid">
			<div id="singleProducts" className="p-4">
				{
					isLoading ? ''
					:  (
					<div className="row">
					<div className="col-4 border-right"><img src={products.image} className="img-fluid img-h" onError={() => {products.image = 'https://images.vexels.com/media/users/3/127491/isolated/preview/8cb9767b47a1f58908a132a8df10b748-computer-set-flat-icon-by-vexels.png'; this.forceUpdate()}} alt="Something that you would like to buy :)"/></div>
					<div className="col-7 m-auto">
						<h3 className="border-bottom pb-3">{products.name}</h3>
						<p>Category: {products.category}</p>
						<p> Quantity: {products.quantity}</p>
						<p>Description: <br/>{products.description}</p>
						<Link to={'/products/edit/' + products.id } style={{color: 'white'}}>  
							<button type="button" className="btn btn-primary mr-2">Edit							</button>
						</Link>
						<Link to={'/products'} style={{color: 'white'}}>
							<button id={products.id} type="button" className="btn btn-danger" onClick={this.deleteProduct.bind(this, products.id)}> Delete </button>
						</Link>
					</div>
				</div>)
					}
					
				
			</div>	
			</div>
			</div>
		)
	}
} 

const mapStateToProps = state => ({
	product: state.product,
	user: state.user
})

export default connect(mapStateToProps, { getProduct, deleteProduct })(SingleProducts);