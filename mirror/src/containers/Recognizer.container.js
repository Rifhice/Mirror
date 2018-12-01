import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Recognizer from '../components/Recognizer';
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';

const mapStateToProps = (state, ownProps) => {
    return {
        FacialRecognition: state.FacialRecognition
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async updateProfile(data) {
            return
        }
    }
}

export default withNamespaces('translation')(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Recognizer)));