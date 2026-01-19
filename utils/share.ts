export const getWhatsappShareUrl = (text: string, url: string = '', isDesktop: boolean = false) => {
  const encodedText = encodeURIComponent(`${text}\n\n${url}`.trim());
  const baseUrl = isDesktop ? 'https://web.whatsapp.com/send' : 'https://api.whatsapp.com/send';
  return `${baseUrl}?text=${encodedText}`;
};

export const getFacebookShareUrl = (url: string) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
};

export const getMessengerShareUrl = (url: string) => {
  // Desktop messenger share usually requires an app_id for the dialog, 
  // but we can try the basic fb-messenger protocol or a generic link
  return `fb-messenger://share/?link=${encodeURIComponent(url)}`;
};

export const getTwitterShareUrl = (text: string, url: string) => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
};

export const getTelegramShareUrl = (text: string, url: string) => {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
