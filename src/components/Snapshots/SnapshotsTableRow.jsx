import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prettyBytes from 'pretty-bytes';
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Chip, TableCell, Tooltip, Button } from '@mui/material';
import { ArchiveRestore, CircleX, Download, Trash } from 'lucide-react';
import ConfirmationDialog from '../Common/ConfirmationDialog';
import CircularProgressWithLabel from '../Common/CircularProgressWithLabel';
import { useClient } from '../../context/client-context';
import { StyledTableRow } from '../Common/StyledTable';

export const SnapshotsTableRow = ({ snapshot, downloadSnapshot, deleteSnapshot }) => {
  const theme = useTheme();
  const { client: qdrantClient } = useClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <StyledTableRow key={snapshot.name}>
      <TableCell width={'60%'}>
        <Tooltip title={'Anlık görüntüyü indir'} arrow placement={'top'}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              verticalAlign: 'middle',
              cursor: progress === 0 ? 'pointer' : 'default',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px',
              '&:hover': {
                textDecoration: progress === 0 ? 'underline' : 'none',
                textDecorationThickness: '1px',
                '& .MuiSvgIcon-root': {
                  color: progress === 0 ? theme.palette.primary.dark : theme.palette.divider,
                },
              },
            }}
            onClick={() => downloadSnapshot(snapshot.name, snapshot.size, progress, setProgress)}
          >
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: alpha(theme.palette.secondary.main, 0.16),
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  marginRight: '0.5rem',
                }}
              >
                <ArchiveRestore
                  size={16}
                  color={progress === 0 ? theme.palette.secondary.main : theme.palette.divider}
                />
              </Box>
              {progress > 0 && (
                <CircularProgressWithLabel
                  value={progress}
                  size={16}
                  color={theme.palette.secondary.main}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-8px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
            {/* show first 20 chars of snapshot name + "..." to fit `Preparing download` chip */}
            {progress === 0 ? snapshot.name : `${snapshot.name.slice(0, 20)}...`}
          </Box>
        </Tooltip>
        {progress > 0 && (
          <Chip
            label={`İndirme hazırlanıyor`}
            size="small"
            sx={{ ml: 3, mb: '2px' }}
            deleteIcon={
              <Tooltip title={'İndirmeyi iptal et'} placement={'right'}>
                <CircleX size={16} />
              </Tooltip>
            }
            onDelete={() => {
              qdrantClient.abortDownload();
              setProgress(0);
            }}
          />
        )}
      </TableCell>
      <TableCell align="center">{snapshot.creation_time || 'bilinmiyor'}</TableCell>
      <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
        {prettyBytes(snapshot.size)}
      </TableCell>
      <TableCell align="right">
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Download size={18} />}
            onClick={() => downloadSnapshot(snapshot.name, snapshot.size, progress, setProgress)}
            sx={{
              px: '10px',
              py: '4px',
            }}
          >
            İndir
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<Trash size={18} />}
            onClick={() => setIsDeleteDialogOpen(true)}
            sx={{
              px: '10px',
              py: '4px',
            }}
          >
            Sil
          </Button>
        </Box>
      </TableCell>
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title={'Anlık görüntüyü sil'}
        content={`${snapshot.name} anlık görüntüsünü silmek istediğinize emin misiniz?`}
        warning={`Bu işlem geri alınamaz.`}
        actionName={'Sil'}
        actionHandler={() => deleteSnapshot(snapshot.name)}
      />
    </StyledTableRow>
  );
};

SnapshotsTableRow.propTypes = {
  snapshot: PropTypes.shape({
    name: PropTypes.string,
    creation_time: PropTypes.string,
    size: PropTypes.number,
  }),
  downloadSnapshot: PropTypes.func,
  deleteSnapshot: PropTypes.func,
};
