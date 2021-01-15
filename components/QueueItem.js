import React from 'react';

export default ({ index, item, session, onRemoveItem, onVoteUp }) => {
  const voteUp =
    item.voters && session.user && item.voters.filter(v => v.id === session.user.id).length === 0 ? (
      <button onClick={onVoteUp}>▲</button>
    ) : null;
  return (
    <div style={{ fontsize: '11px', marginBottom: '15px', float: 'left', width: '297px' }}>
      <div style={{ paddingRight: '10px', float: 'left' }}>
        <img src={item.track.album.images[2].url} width="40" height="40" />
      </div>
      <div style={{ paddingRight: '10px', float: 'left' }}>{index + 1}</div>
      <div style={{ paddingRight: '10px', float: 'left' }}>
        {item.track.name}
        <br></br>
        {item.track.artists.map(a => a.name).join(', ')}
        <br></br>
      </div>
      <div style={{ paddingRight: '10px', float: 'left', display: 'none' }}>
        {item.user && (item.user.display_name || item.user.id)}
      </div>
      <div style={{ paddingRight: '10px', float: 'right' }}>
        {item.user && session.user && item.user.id === session.user.id ? (
          <button
            onClick={() => {
              onRemoveItem(item.id);
            }}
          >
            X
          </button>
        ) : (
          voteUp
        )}
      </div>
      <div style={{ paddingRight: '10px', float: 'left' }}>
        {item.voters && item.voters.length > 0 ? (
          <span>{item.voters.length === 1 ? '1 vote' : item.voters.length + ' votes'}</span>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
