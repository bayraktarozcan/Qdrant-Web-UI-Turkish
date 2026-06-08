import { TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

const ClusterInfoHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography variant="subtitle1" fontWeight={600}>
            Parçacık No
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle1" fontWeight={600}>
            Konum
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle1" fontWeight={600}>
            Durum
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ClusterInfoHead;
