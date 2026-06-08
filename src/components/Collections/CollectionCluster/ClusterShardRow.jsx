import { TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const SHARD_STATE_LABELS = {
  Active: 'Aktif',
  Dead: 'Ölü',
  Partial: 'Kısmi',
  Empty: 'Boş',
  Resharding: 'Yeniden Parçalama',
  Listener: 'Dinleyici',
};

const ClusterShardRow = ({ shard, clusterPeerId }) => {
  return (
    <TableRow data-testid="shard-row">
      <TableCell>
        <Typography variant="subtitle1" component={'span'} color="text.secondary">
          {shard.shard_id}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle1" component={'span'} color="text.secondary">
          {shard.peer_id ? `Uzak (${shard.peer_id})` : `Yerel (${clusterPeerId ?? 'bilinmiyor'})`}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle1" component={'span'} color="text.secondary">
          {SHARD_STATE_LABELS[shard.state] || shard.state}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

ClusterShardRow.propTypes = {
  shard: PropTypes.shape({
    shard_id: PropTypes.number,
    peer_id: PropTypes.number,
    state: PropTypes.string,
  }).isRequired,
  clusterPeerId: PropTypes.number,
};

export default ClusterShardRow;
