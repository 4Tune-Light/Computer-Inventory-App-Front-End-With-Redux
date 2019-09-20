import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProducts, deleteProduct } from '../../redux/actions/productActions';

import ProductsItem from './ProductsItem';
import Title from './Title';
import {Redirect} from 'react-router-dom';
import NavigationBar from '../headers/navbar/Navbar';

import './style.css';

class Products extends Component {
	static propTypes = {
		getProducts: PropTypes.func.isRequired,
		product: PropTypes.object.isRequired,
	}

	state = {
		search: '%%',
		sortBy: 'updated_at',
		sort: 'DESC',
		page: 1,
		limit: 6,
	}

	componentDidMount() {
		this.props.getProducts(this.state); 
	}

	deleteProduct = async (id) => {
		await this.props.deleteProduct(id, this.props.user);
		await this.props.getProducts(this.state); 
	}

	callBack = async (query) => {
		await this.setState(query);
		this.componentDidMount();
	}

	pageNumber = () => {
		var data = [];
		const counter =  Math.ceil(this.props.product.total.total / this.state.limit);
		for (let i = 1; i <= counter; i++) {
			data.push(i);
		}
		return data
	}

	render() {
		const pageNum = this.pageNumber();
		const { isLoading, products, total } = this.props.product;
		return (
			<div>
				<NavigationBar user={this.props.user} />
				<Title callBack={this.callBack} pagination={pageNum}/>
				<div id="products" className="row justify-content-md-center">
					{
						(!isLoading && products.length > 0) ? products.map(product => {
								return <ProductsItem product={product} key={product.id} deleteProduct={this.deleteProduct} />
							}) 
						:
							<img className="img-fluid img-size mx-auto" src="https://avanauptown.com/views/site/images/icons/loading.gif" />	
					}
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	product: state.product,
	user: state.user
})

export default connect(mapStateToProps, { getProducts, deleteProduct})(Products);