import { useCallback } from 'react';
import toast from 'react-hot-toast';

type ShareData = {
  title?: string;
  text?: string;
  url?: string;
};

export const useShare = () => {
  const share = useCallback(async (data: ShareData) => {
    const shareData = {
      title: data.title || document.title,
      text: data.text,
      url: data.url || window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('הקישור הועתק ללוח');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
        toast.error('שגיאה בהעתקת הקישור');
      }
    }
  }, []);

  return { share };
};
