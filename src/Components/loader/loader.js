import React from 'react';

import './loader.css';

const AppLoader = (props) => {
	return(

<div id="myModal" className="app-modal">
<div className="app-modal-content">
    <div className="loader"></div>
    <h4 className="text-center">{props.message}</h4>
  </div>
  </div>
		)
}

export default AppLoader;