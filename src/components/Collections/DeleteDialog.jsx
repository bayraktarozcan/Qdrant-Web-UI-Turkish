import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useClient } from '../../context/client-context';
import ErrorNotifier from '../ToastNotifications/ErrorNotifier';
import ConfirmationDialog from '../Common/ConfirmationDialog';

export default function DeleteDialog({ open, setOpen, collectionName, getCollectionsCall }) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { client: qdrantClient } = useClient();

  async function callDelete() {
    try {
      await qdrantClient.deleteCollection(collectionName);
      getCollectionsCall();
      setOpen(false);
      setHasError(false);
    } catch (error) {
      setErrorMessage(`Silme başarısız, hata: ${error.message}`);
      setHasError(true);
      setOpen(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {hasError && <ErrorNotifier {...{ message: errorMessage }} />}
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        title={collectionName + ' koleksiyonunu silmek istiyor musunuz?'}
        warning={
          'Bir koleksiyonu silmek geri alınamaz. ' +
          'Devam etmeden önce tüm önemli verilerin yedeğini aldığınızdan emin olun.'
        }
        actionName={'Sil'}
        actionHandler={callDelete}
        aria-label="Koleksiyon Silme Onay İletişimi"
      />
    </>
  );
}

DeleteDialog.propTypes = {
  collectionName: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  getCollectionsCall: PropTypes.func.isRequired,
};
