import React, {Component } from 'react';
import { withRouter } from 'react-router-dom';

import { ButtonContainer } from "./Button";

class Navbar extends Component{
	constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
		localStorage.removeItem('email');
		this.props.history.push('/login')
    }
  render(){
	  return (
		     <nav className="navbar navbar-expand-sm bg-dark navbar-dark px-sm-5">
			     <h3 style={{textAlign:"center", color:"#fff"}}>Herd</h3>
			     	<div style={{textAlign:"center"}} className="ml-auto">
				     	<ButtonContainer onClick={this.logout} >
				     		<span className="mar-2">
				     			<i className="fa fa-sign-out" aria-hidden="true"></i>
				     		</span>
				     		 	Logout
				     	</ButtonContainer>
				    </div>
		     </nav>
	  );
	}
}

export default withRouter(Navbar);