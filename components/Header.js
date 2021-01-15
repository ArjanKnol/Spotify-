import Link from 'next/link';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { login } from '../actions/sessionActions';
import { mutePlayback, unmutePlayback } from '../actions/playbackActions';
import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';

const linkStyle = {
  lineHeight: '30px',
  marginRight: 15
};

const mainLinkStyle = {
  float: 'left',
  marginRight: '10px'
};

const headerStyle = {
  backgroundColor: '#0D0C0C',
  padding: '30px 40px',
  height: '30px',
  color: '#333'
};

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <div style={headerStyle}>
    {session.user ? (
      <div className="media user-header">
        <style jsx>{`
          .user-header {
            float: right;
            width: 150px;
          }
          .user-image {
            border-radius: 50%;
          }
          .user-name {
            line-height: 30px;
            color: #fff;
          }
          .media,
          .media__bd {
            overflow: hidden;
            _overflow: visible;
            zoom: 1;
          }
          .media .media__img {
            float: left;
            margin-right: 10px;
          }
          .btn-scafe {
            background-color: #0d0c0c;
            color: #fff;
          }
        `}</style>
        <div className="media__img">
          <img
            className="user-image"
            src={
              (session.user.images && session.user.images.length && session.user.images[0].url) ||
              '/static/user-icon.png'
            }
            width="30"
            height="30"
            alt={getNameFromUser(session.user)}
          />
        </div>
        <div className="user-name media__bd">{getNameFromUser(session.user)}</div>
      </div>
    ) : (
      <button className="btn btn--dark btn-scafe" style={{ float: 'right' }} onClick={login}>
        <style jsx>{ButtonStyle}</style>
        <style jsx>{ButtonDarkStyle}</style>
        <FormattedMessage id="login" />
      </button>
    )}
    {session.user ? (
      <div className="playback-control">
        <style jsx>{ButtonStyle}</style>
        <style jsx>{ButtonDarkStyle}</style>
        <style jsx>{`
          .playback-control {
            float: left;
          }
        `}</style>
        <button
          className="btn btn--dark btn-scafe"
          onClick={() => {
            muted ? unmutePlayback() : mutePlayback();
          }}
        >
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    ) : null}
  </div>
);

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
  mutePlayback: () => dispatch(mutePlayback()),
  unmutePlayback: () => dispatch(unmutePlayback())
});

const mapStateToProps = state => ({
  session: state.session,
  muted: state.playback.muted
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
