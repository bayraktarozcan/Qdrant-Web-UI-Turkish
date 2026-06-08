import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Alert } from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
import { CopyButton } from '../../Common/CopyButton';
import { useTheme } from '@mui/material/styles';

const ShardTransferDialog = ({ open, onClose, transferRequest, onConfirm, loading = false, collectionName }) => {
  const theme = useTheme();

  if (!transferRequest) {
    return null;
  }

  const { shard, fromPeerId, toPeerId } = transferRequest;

  // Format the request payload for display
  const requestPayload = {
    move_shard: {
      shard_id: shard.shard_id,
      to_peer_id: toPeerId,
      from_peer_id: fromPeerId,
    },
  };

  const requestString = JSON.stringify(requestPayload, null, 2);

  const handleConfirm = () => {
    onConfirm(transferRequest);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Parçacık Aktar
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Bu işlem {shard.shard_id} numaralı parçacığı {fromPeerId} düğümünden {toPeerId} düğümüne taşıyacak.
              {shard.shard_key && ` Parçacık anahtarı: ${shard.shard_key}`}
            </Typography>
          </Alert>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                İstek
              </Typography>
              <CopyButton
                text={`POST collections/${collectionName}/cluster\n${requestString}`}
                tooltip="İsteği panoya kopyala"
                successMessage="İstek panoya kopyalandı"
              />
            </Box>

            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                p: 1,
                backgroundColor: theme.palette.background.paper,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  mb: 1,
                  fontFamily: 'monospace',
                }}
              >
                POST collections/{collectionName}/cluster
              </Typography>
              <JsonViewer
                value={requestPayload}
                theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
                style={{
                  backgroundColor: 'transparent',
                  fontSize: '0.875rem',
                }}
                enableClipboard={false}
                displayDataTypes={false}
                rootName={false}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
              Parçacık Detayları
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 1,
                fontSize: '0.875rem',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No:
              </Typography>
              <Typography variant="body2">{shard.shard_id}</Typography>

              <Typography variant="body2" color="text.secondary">
                Durum:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: shard.state === 'Active' ? 'success.main' : 'warning.main',
                  fontWeight: 'medium',
                }}
              >
                {shard.state}
              </Typography>

              {shard.shard_key && (
                <>
              <Typography variant="body2" color="text.secondary">
                Anahtar:
              </Typography>
                  <Typography variant="body2" fontFamily="monospace">
                    {shard.shard_key}
                  </Typography>
                </>
              )}

              <Typography variant="body2" color="text.secondary">
                Kaynak Düğüm:
              </Typography>
              <Typography variant="body2">{fromPeerId}</Typography>

              <Typography variant="body2" color="text.secondary">
                Hedef Düğüm:
              </Typography>
              <Typography variant="body2">{toPeerId}</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          İptal
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary" disabled={loading}>
          {loading ? 'Aktarılıyor...' : 'Aktarımı Onayla'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ShardTransferDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  transferRequest: PropTypes.shape({
    shard: PropTypes.shape({
      shard_id: PropTypes.number.isRequired,
      state: PropTypes.string.isRequired,
      shard_key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    fromPeerId: PropTypes.number.isRequired,
    toPeerId: PropTypes.number.isRequired,
  }),
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  collectionName: PropTypes.string.isRequired,
};

export default ShardTransferDialog;
