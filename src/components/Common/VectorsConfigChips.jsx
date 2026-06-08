import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Link, styled, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Ellipsis } from 'lucide-react';

const StyledChip = styled(({ title, ...props }) => (
  <Tooltip title={title}>
    <Chip {...props} />
  </Tooltip>
))(({ theme }) => ({
  height: '1.5rem',
  borderRadius: '0.5rem',
  fontSize: '0.8125rem',
  lineHeight: '1.125rem',
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiChip-label': {
    padding: '0.1875rem 0.375rem',
  },
}));

const VectorChipsContainer = styled(Box)({
  display: 'flex',
  gap: '0.1rem',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const VectorsConfigChips = ({ collectionConfigParams, collectionName, sx = {} }) => {
  const navigate = useNavigate();

  const handleEllipsisClick = () => {
    if (collectionName) {
      navigate(`/collections/${encodeURIComponent(collectionName)}#info`);
    }
  };

  const renderVectorChips = (vectorName, vectorConfig) => {
    const chips = [
      <StyledChip key="name" label={vectorName || 'Default'} title={'Vektör Adı'} />,
      <StyledChip key="size" label={vectorConfig.size} title={'Boyut'} />,
      <StyledChip key="distance" label={vectorConfig.distance} title={'Uzaklık'} />,
    ];

    // Add model chip if present
    if (vectorConfig.model) {
      chips.push(<StyledChip key="model" label={vectorConfig.model} title={'Model'} />);
    }

    return chips;
  };

  const renderSparseVectorChips = (vectorName) => {
    return [
      <StyledChip key="name" label={vectorName} title={'Vektör Adı'} />,
      <StyledChip key="type" label="Seyrek" title={'Tür'} />,
    ];
  };

  const allChips = [];

  if (collectionConfigParams.vectors.size) {
    allChips.push(
      <VectorChipsContainer key="default-vector">
        {renderVectorChips('Default', collectionConfigParams.vectors)}
      </VectorChipsContainer>
    );
  }

  if (!collectionConfigParams.vectors.size) {
    Object.keys(collectionConfigParams.vectors).forEach((vector) => {
      allChips.push(
        <VectorChipsContainer key={vector}>
          {renderVectorChips(vector, collectionConfigParams.vectors[vector])}
        </VectorChipsContainer>
      );
    });
  }

  if (collectionConfigParams.sparse_vectors) {
    Object.keys(collectionConfigParams.sparse_vectors).forEach((vector) => {
      allChips.push(
        <VectorChipsContainer key={`sparse-${vector}`}>{renderSparseVectorChips(vector)}</VectorChipsContainer>
      );
    });
  }

  if (allChips.length > 3) {
    const visibleChips = allChips.slice(0, 3);
    const ellipsisChip = (
      <VectorChipsContainer key="ellipsis">
        <StyledChip
          label={
            <Box
              sx={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Ellipsis size={18} />
            </Box>
          }
          title={'Tümünü Bilgi bölümünde gör'}
          component={Link}
          onClick={handleEllipsisClick}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        />
      </VectorChipsContainer>
    );
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, ...sx }}>
        {visibleChips}
        {ellipsisChip}
      </Box>
    );
  }

  return <Box sx={{ ...sx }}>{allChips}</Box>;
};

VectorsConfigChips.propTypes = {
  collectionConfigParams: PropTypes.object.isRequired,
  collectionName: PropTypes.string,
  sx: PropTypes.object,
};

export default VectorsConfigChips;
