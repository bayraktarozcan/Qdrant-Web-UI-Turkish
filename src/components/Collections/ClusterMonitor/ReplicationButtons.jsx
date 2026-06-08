import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Button, Typography } from '@mui/material';
import { Minus, Plus } from 'lucide-react';

const ReplicationControl = ({ cluster, replicationFactor, replicationLoading, transferLoading, onApply }) => {
  const [localFactor, setLocalFactor] = useState(replicationFactor);
  const peerCount = cluster?.peers?.length || 0;
  const isLoading = replicationLoading || transferLoading;
  const hasChanged = localFactor !== replicationFactor;

  useEffect(() => {
    setLocalFactor(replicationFactor);
  }, [replicationFactor]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
        Çoğaltma faktörü:
      </Typography>
      <IconButton
        size="small"
        onClick={() => setLocalFactor((v) => Math.max(1, v - 1))}
        disabled={isLoading || localFactor <= 1}
        aria-label="Çoğaltma faktörünü azalt"
      >
        <Minus size={16} />
      </IconButton>
      <Typography
        variant="body2"
        sx={{
          minWidth: '1.5rem',
          textAlign: 'center',
          fontWeight: 'bold',
          userSelect: 'none',
        }}
      >
        {localFactor}
      </Typography>
      <IconButton
        size="small"
        onClick={() => setLocalFactor((v) => Math.min(peerCount, v + 1))}
        disabled={isLoading || localFactor >= peerCount}
        aria-label="Çoğaltma faktörünü artır"
      >
        <Plus size={16} />
      </IconButton>
      {hasChanged && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => onApply(localFactor)}
          disabled={isLoading}
          sx={{
            minWidth: 'auto',
            fontSize: '0.8125rem',
            padding: '0.125rem 0.5rem',
            ml: 0.5,
          }}
        >
          {isLoading ? 'Uygulanıyor...' : 'Uygula'}
        </Button>
      )}
    </Box>
  );
};

ReplicationControl.propTypes = {
  cluster: PropTypes.object,
  replicationFactor: PropTypes.number.isRequired,
  replicationLoading: PropTypes.bool.isRequired,
  transferLoading: PropTypes.bool.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default ReplicationControl;
