import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useClient } from '../../context/client-context';

export function ApiKeyDialog({ open, setOpen, onApply }) {
  const { settings, setSettings } = useClient();
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClickShowApiKey = () => setShowApiKey((show) => !show);

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const [apiKey, setApiKey] = React.useState('');

  const handleClose = () => {
    setError(false);
    setOpen(false);
  };

  const handleApply = () => {
    if (!apiKey) {
      setError(true);
      return;
    }
    setSettings({ ...settings, apiKey });
    setOpen(false);
    onApply();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          transition: {
            onEntered: () => {
              const input = document.getElementById('api-key-input');
              if (input) {
                input.focus();
              }
            },
          },
        }}
      >
        <DialogTitle>API Anahtarı Belirle</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Bu Qdrant örneği bir API Anahtarı ile korunuyor olabilir.{' '}
            Öyleyse, devam etmek için lütfen API Anahtarınızı girin.
          </DialogContentText>
          <TextField
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleApply();
              }
            }}
            autoFocus
            id="api-key-input"
            placeholder="API Anahtarı"
            error={error}
            helperText={error ? 'API Anahtarı gerekli' : ''}
            type={showApiKey ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="şifre görünürlüğünü değiştir"
                      onClick={handleClickShowApiKey}
                      onMouseDown={handleMouseDown}
                    >
                      {showApiKey ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            İptal
          </Button>
          <Button variant="contained" onClick={handleApply}>
            Uygula
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ApiKeyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};
