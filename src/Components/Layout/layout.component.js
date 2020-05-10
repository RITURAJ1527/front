import React, { Component } from 'react';

import AppRoutes from './Routes/routes.component';

class AppLayout extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <AppRoutes />
                </div>
            </React.Fragment>
        )
    }
}

export default AppLayout;