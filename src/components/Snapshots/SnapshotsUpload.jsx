import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import UploadFile from '@mui/icons-material/UploadFile';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SnapshotUploadForm } from './SnapshotUploadForm';
import { useClient } from '../../context/client-context';

export const SnapshotsUpload = ({ onComplete, sx }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const { isRestricted } = useClient();

  const handleUploadClick = () => {
    if (!isRestricted) {
      setOpen(true);
    }
  };

  const handleUpload = () => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <Box sx={{ ...sx }}>
      <Tooltip
        title={
          isRestricted
            ? 'Erişim Reddedildi: Anlık görüntü yükleme izniniz yok. ' + 'Lütfen yöneticinize başvurun.'
            : 'Anlık görüntü yükle'
        }
        placement="left"
      >
        <span>
          <Button
            variant={'outlined'}
            onClick={handleUploadClick}
            startIcon={<UploadFile fontSize={'small'} />}
            disabled={isRestricted}
          >
            Anlık görüntü yükle
          </Button>
        </span>
      </Tooltip>

      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Anlık görüntü yükleme diyaloğu"
        aria-describedby="Anlık görüntü yükleme diyaloğu"
      >
        <DialogTitle>Anlık Görüntü Yükle</DialogTitle>
        <DialogContent>
          <SnapshotUploadForm onSubmit={handleUpload} onComplete={onComplete} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

// props validation
SnapshotsUpload.propTypes = {
  onComplete: PropTypes.func,
  sx: PropTypes.object,
};
