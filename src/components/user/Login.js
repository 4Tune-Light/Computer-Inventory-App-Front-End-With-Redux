import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../redux/actions/userActions';

import './style.css';

class Login extends Component {
	state = {
		email: '',
		password: '',
	}

	loginSubmit = e => {
		e.preventDefault();
		const user = this.state;
		this.props.loginUser(user);	
	}

	editData = e => {
		this.setState({ [e.target.name]: e.target.value})
		console.log(this.state)
	}

	render() {
		const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DXcMqpPAqu2Pm_7LxNpbD4it1EyYUGZHjjKNLFXp6o_LJD51";
		
		if (this.props.user.isLogged) {
			return(<Redirect to="/products" />)
		} else {
			return (
				<div className="container-fluid centering bgImg">
					<form className="user-form">
						<div className="img-center">
							<img src={imgSrc} className="img-fluid img-height" alt="Guest Face"/>
							<h3>Login User </h3>
						</div>

						<h6 id="errorMessage" className="form-text text-center" style={{display: 'none', color: 'red'}}>{this.state.errMessage}</h6>
					  <div className="form-group">
					    <label>Email address</label>
					    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={this.state.email} onChange={this.editData} autoComplete="off" />
					  </div>
					  <div className="form-group">
					    <label>Password</label>
					    <input type="password" className="form-control" id="Password" placeholder="Password" value={this.state.password} onChange={this.editData} name="password" autoComplete="off" />
					  </div>
					  <div className="row">
					  	<div className="col-6"><Link to="/register" style={{color: 'white', textDecoration: 'none'}}><button type="button" className="btn btn-success px-4 py-2 float-left">Register</button></Link></div>
					  	<div className="col-6"><button type="button" className="btn btn-primary px-4 py-2 float-right" onClick={this.loginSubmit}>Login</button></div>
					  </div>
					</form>
				</div>
			)
		}
	}
} 

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps, { loginUser })(Login);