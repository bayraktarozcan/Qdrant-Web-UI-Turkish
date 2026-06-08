import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
import { CopyButton } from '../../Common/CopyButton';
import { useTheme } from '@mui/material/styles';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const ReshardingDialog = ({ open, onClose, direction, onConfirm, loading = false, collectionName, shardKeys = [] }) => {
  const theme = useTheme();
  const [selectedShardKey, setSelectedShardKey] = useState('');

  React.useEffect(() => {
    // Reset selection when dialog opens/closes
    if (!open) {
      setSelectedShardKey('');
    } else if (shardKeys.length > 0 && selectedShardKey === '') {
      // Auto-select first shard key if shard keys are present and none is selected
      setSelectedShardKey(shardKeys[0]);
    }
  }, [open, shardKeys]);

  if (!direction) {
    return null;
  }

  const isUp = direction === 'up';
  const hasShardKeys = shardKeys.length > 0;

  // Format the request payload for display
  const requestPayload = {
    start_resharding: {
      direction,
    },
  };

  // Add shard_key if shard keys are present (required) or if selected
  if (hasShardKeys && selectedShardKey !== '') {
    requestPayload.start_resharding.shard_key = selectedShardKey === 'null' ? null : selectedShardKey;
  }

  const requestString = JSON.stringify(requestPayload, null, 2);

  const handleConfirm = () => {
    // If shard keys are present, shard key is required
    if (hasShardKeys && selectedShardKey === '') {
      return; // Don't proceed if required shard key is not selected
    }
    const shardKeyValue = selectedShardKey === '' ? null : selectedShardKey === 'null' ? null : selectedShardKey;
    onConfirm(direction, shardKeyValue);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          {isUp ? 'Yukarı Yeniden Parçacıkla' : 'Aşağı Yeniden Parçacıkla'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Bu işlem, <strong>{collectionName}</strong> koleksiyonundaki{' '}
              parçacık sayısını {isUp ? 'artıracak' : 'azaltacak'}.
            </Typography>
            {isUp ? (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Yukarı yeniden parçacıklama, verileri daha fazla düğüme dağıtmak{' '}
                için yeni bir parçacık ekleyerek ölçeklenebilirliği ve{' '}
                performansı iyileştirir.
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Aşağı yeniden parçacıklama, bir parçacığı kaldırarak verileri daha az parçacıkta birleştirir.
              </Typography>
            )}
          </Alert>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
              Önemli hususlar:
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2, mb: 0, mt: 0.5 }}>
              <li>Yeniden parçacıklama sırasında performans bir miktar düşebilir</li>
              <li>İşlem sırasında bildirilen nokta sayıları doğru olmayacaktır</li>
              <li>Büyük koleksiyonlarda yeniden parçacıklama uzun sürebilir</li>
              <li>Koleksiyon başına aynı anda yalnızca bir yeniden parçacıklama işlemi çalışabilir</li>
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mb: 2 }}>
            {isUp ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
            <Typography variant="body2">
              Yön: <strong>{isUp ? 'Yukarı (parçacık ekle)' : 'Aşağı (parçacık kaldır)'}</strong>
            </Typography>
          </Box>

          {hasShardKeys && (
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth required>
                <InputLabel id="shard-key-select-label">Parçacık Anahtarı</InputLabel>
                <Select
                  labelId="shard-key-select-label"
                  id="shard-key-select"
                  value={selectedShardKey}
                  label="Parçacık Anahtarı *"
                  onChange={(e) => setSelectedShardKey(e.target.value)}
                  disabled={loading}
                  required
                >
                  {shardKeys.map((key) => (
                    <MenuItem key={key} value={key}>
                      {String(key)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Bu koleksiyon için bir parçacık anahtarı seçin. Bu koleksiyon özel parçacıklama kullanıyor.
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          İptal
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          disabled={loading || (hasShardKeys && selectedShardKey === '')}
        >
          {loading
            ? 'Başlatılıyor...'
            : `${isUp ? 'Yukarı Yeniden Parçacıklamayı' : 'Aşağı Yeniden Parçacıklamayı'} Onayla`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ReshardingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['up', 'down']),
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  collectionName: PropTypes.string.isRequired,
  shardKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default ReshardingDialog;
