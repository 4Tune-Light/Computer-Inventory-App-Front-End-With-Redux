import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendQuery } from '../../redux/actions/productActions';


class Title extends Component {
	state = {
		search: '%%',
		sortBy: 'updated_at',
		sort: 'DESC',
		page: 1,
		limit: 6,
	}

	handlerChange = async (e) => {
		await this.setState({ [e.target.name]: e.target.value});
		this.props.callBack(this.state);
	}

	render() {
		return(
			<div id="title" className="col-12">
			<div className="row">
				<div className="col-6"><h3>Computer Products</h3></div>
				<div className="col-6"><form className="form-inline ml-auto float-right">
	        <input className="form-control mr-sm-2" type="search" name="search" placeholder="Search" aria-label="Search" onChange={this.handlerChange} />
	      </form></div>
	    </div>
				<hr/>
				<div className="row">
					<div className="col-4">
						<ul className="query">
							<li className="query-item mr-4">
								<select defaultValue="Sort By" className="form-control" name="sortBy" onChange={this.handlerChange}>
						      <option disabled>Sort By</option>
						      <option value="name">Name</option>
						      <option value="id_category">Category</option>
						      <option value="quantity">Quantity</option>
						      <option value="created_at">Date</option>
						    </select>
						  </li>
						  <li className="query-item mr-4">
							  <select defaultValue="Sort" className="form-control" name="sort" onChange={this.handlerChange}>
						      <option disabled>Sort</option>
						      <option value="asc">ASC</option>
						      <option value="desc">DESC</option>
						    </select>
						  </li>
						  <li className="query-item mr-4">
						  	<select defaultValue="Limit" className="form-control" name="limit" onChange={this.handlerChange}>
						      <option disabled>Limit</option>
						      <option value="6">6</option>
						      <option value="9">9</option>
						      <option value="12">12</option>
						      <option value="15">15</option>
						    </select>
						  </li>
						</ul>
					</div>
					<div className="col-4">
						  <select value={this.state.page} className="form-control" name="page" onChange={this.handlerChange}>
						  	<option disabled selected>Select Page</option>
						{
							this.props.pagination.map(num => {
								return <option value={num} key={num}>{num}</option>
							})
						}
							</select>
					</div>
					<div className="col-4">
						<Link to="/products/create" style={{color: 'white', textDecoration: 'none'}}><button className="btn btn-success float-right btn-lg">Create Product</button></Link>
					</div>
				</div>

				</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps, { sendQuery })(Title);