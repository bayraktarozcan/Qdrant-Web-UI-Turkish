import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Alert } from '@mui/material';

const AbortReshardingDialog = ({ open, onClose, onConfirm, loading = false, collectionName }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Yeniden Parçacıklama İşlemini İptal Et
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>{collectionName}</strong> koleksiyonu için devam eden{' '}
            yeniden parçacıklama işlemini iptal etmek istediğinize emin misiniz?
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Devam Et
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={loading}>
          {loading ? 'İptal ediliyor...' : 'Yeniden Parçacıklamayı İptal Et'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AbortReshardingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  collectionName: PropTypes.string.isRequired,
};

export default AbortReshardingDialog;
