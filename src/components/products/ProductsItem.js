import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addOrReduce } from '../../redux/actions/productActions';

class ProductsItem extends Component {
	state = {
		quantity: 0
	}

	componentDidMount() {
		this.setState({quantity: this.props.product.quantity})
	}

	addOrReduceBtn = async (e) => {
		e.preventDefault();
		this.props.addOrReduce(this.props.product.id, e.target.value, this.props.user)
		if( e.target.value === 'add' ) {
			this.setState({quantity: this.state.quantity+1})
		} else {
			this.setState({quantity: this.state.quantity-1})
		}
		console.log(this.state);
	}

	render() {
		const {id, name, image, category, quantity} =  this.props.product;
		return (
			<div id="productsItem" className="border col-3 mx-4 mt-5 mb-3 p-0">
				<div className="text-center">
					<img src={image} onError={() => {this.props.product.image = 'https://images.vexels.com/media/users/3/127491/isolated/preview/8cb9767b47a1f58908a132a8df10b748-computer-set-flat-icon-by-vexels.png'; this.forceUpdate()}} className="img-fluid d-inline-block img-h" alt="Something that you like to buy :)"/>
				</div>
				<div className="p-3">
					<h5><Link to={'/products/' + id } style={{textDecoration: 'none'}}>{name}</Link></h5>
					<p>Category: {category}<br/>
					   Quantity: {this.state.quantity}</p>
					<form>
						<button id={id} type="button" className="btn btn-primary mr-2" onClick={this.addOrReduceBtn} value="add"> Add </button>
						<button id={id} type="button" className="btn btn-warning mr-2" onClick={this.addOrReduceBtn} value="reduce"> Reduce </button>
						<button id={id} type="button" className="btn btn-danger" onClick={this.props.deleteProduct.bind(this, id)}> Delete </button>
					</form>
				</div>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps, { addOrReduce })(ProductsItem);