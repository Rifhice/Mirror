import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Time from '../components/Time';
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default withNamespaces('translation')(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Time)));