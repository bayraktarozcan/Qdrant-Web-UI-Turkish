import { useSnackbar } from 'notistack';
import { getSnackbarOptions } from '../components/Common/utils/snackbarOptions';

export const useCopyToClipboard = ({ successMessage = 'Panoya kopyalandı', duration = 1000 }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const successSnackbarOptions = getSnackbarOptions('success', closeSnackbar, duration);
  const errorSnackbarOptions = getSnackbarOptions('error', closeSnackbar);

  const copyToClipboard = async (text) => {
    if (window.isSecureContext === false) {
      enqueueSnackbar('Pano erişimi güvenli olmayan bağlamlarda kullanılamaz.', { variant: 'warning' });
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(successMessage, successSnackbarOptions);
      return true;
    } catch (err) {
      enqueueSnackbar(err.message, errorSnackbarOptions);
      return false;
    }
  };

  return { copyToClipboard };
};
