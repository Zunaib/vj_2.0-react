import { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout()
    }
    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.deAuth())
    }
}


export default connect(null, mapDispatchToProps)(Logout);
