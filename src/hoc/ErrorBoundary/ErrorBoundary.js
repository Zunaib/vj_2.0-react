import React, { Component } from 'react';
export const errorWrapperHOC = function (wrappedComponent) {
    return class ErrorHoccedComp extends Component {
        render() {
            const { error } = this.props; // pass it here somehow.
            if (!error) {
                return <wrappedComponent {...this.props} />
            }
            if (error === '404') {
                return <h1>404</h1>
            }
            if (error === '500') {
                return <h1>500</h1>
            }
            return <h1>unknown error happened.</h1>
        }
    }
}