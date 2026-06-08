import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, OutlinedInput, MenuItem, TextField, Typography, InputLabel } from '@mui/material';
import TokenValidatior from './TokenValidatior';
import JwtPerCollection from './JwtPerCollection';
import StyledButtonGroup from '../Common/StyledButtonGroup';

const ExpirationSelect = ({ expiration, setExpiration }) => {
  const handleChange = (event) => {
    setExpiration(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }} role="group">
      <InputLabel
        htmlFor="expiration-select"
        sx={{
          color: 'text.primary',
          fontWeight: 500,
        }}
      >
        Süre
      </InputLabel>
      <TextField
        select
        fullWidth
        id="expiration-select"
        value={expiration}
        onChange={handleChange}
        slots={{
          input: OutlinedInput,
        }}
        sx={{
          '& .MuiSelect-outlined': {
            py: 1.5,
          },
        }}
      >
        <MenuItem value={1}>1 gün</MenuItem>
        <MenuItem value={7}>7 gün</MenuItem>
        <MenuItem value={30}>30 gün</MenuItem>
        <MenuItem value={90}>90 gün</MenuItem>
        <MenuItem value={0}>Hiç</MenuItem>
      </TextField>
    </Box>
  );
};

ExpirationSelect.propTypes = {
  expiration: PropTypes.number.isRequired,
  setExpiration: PropTypes.func.isRequired,
};

function JwtForm({
  expiration,
  setExpiration,
  globalAccess,
  setGlobalAccess,
  manageAccess,
  setManageAccess,
  collections,
  setConfiguredCollections,
  setTokenValidatior,
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }} role="form">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
        <StyledButtonGroup fullWidth variant="outlined" aria-label="Erişim Seviyesi">
          <Button
            variant={!globalAccess && !manageAccess ? 'contained' : 'outlined'}
            onClick={() => {
              setManageAccess(false);
              setGlobalAccess(false);
            }}
          >
            Koleksiyon Erişimi
          </Button>
          <Button
            variant={globalAccess && !manageAccess ? 'contained' : 'outlined'}
            onClick={() => {
              setManageAccess(false);
              setGlobalAccess(true);
              setConfiguredCollections([]); // Reset collections if global or managed access is selected
            }}
          >
            Küresel Erişim
          </Button>
          <Button
            variant={manageAccess ? 'contained' : 'outlined'}
            onClick={() => {
              setManageAccess(true);
              setGlobalAccess(true);
              setConfiguredCollections([]); // Reset collections if global or managed access is selected
            }}
          >
            Yönetilen Erişim
          </Button>
        </StyledButtonGroup>

        {/* Description of the access level, displayed depending on the button selection*/}
        {manageAccess && (
          <Typography variant="body2" color="text.secondary">
            <strong>Yönetilen Erişim:</strong> Qdrant&apos;ta saklanan tüm verilere tam erişim. Bu erişim seviyesi, tüm
            koleksiyonlardaki verileri okumanıza ve yazmanıza, ayrıca koleksiyon oluşturma ve silme, koleksiyon
            ayarlarını değiştirme vb. işlemleri yapmanıza olanak tanır.
          </Typography>
        )}
        {globalAccess && !manageAccess && (
          <Typography variant="body2" color="text.secondary">
            <strong>Küresel Erişim:</strong> Qdrant&apos;ta saklanan tüm verilere salt okunur erişim sağlar.
          </Typography>
        )}
        {!globalAccess && !manageAccess && (
          <Typography variant="body2" color="text.secondary">
            <strong>Koleksiyon Erişimi:</strong>
            Bu erişim seviyesi, belirli koleksiyonlar için erişim düzeyini yapılandırmanıza olanak tanır.
          </Typography>
        )}
      </Box>

      {collections.length > 0 && (
        <JwtPerCollection
          globalAccess={globalAccess}
          collections={collections}
          setConfiguredCollections={setConfiguredCollections}
          manageAccess={manageAccess}
        />
      )}

      <TokenValidatior setTokenValidatior={setTokenValidatior} />

      <ExpirationSelect expiration={expiration} setExpiration={setExpiration} />
    </Box>
  );
}

JwtForm.propTypes = {
  expiration: PropTypes.number.isRequired,
  setExpiration: PropTypes.func.isRequired,
  globalAccess: PropTypes.bool.isRequired,
  setGlobalAccess: PropTypes.func.isRequired,
  manageAccess: PropTypes.bool.isRequired,
  setManageAccess: PropTypes.func.isRequired,
  collections: PropTypes.array.isRequired,
  setConfiguredCollections: PropTypes.func.isRequired,
  setTokenValidatior: PropTypes.func.isRequired,
};

export default JwtForm;
