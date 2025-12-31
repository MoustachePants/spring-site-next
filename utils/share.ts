export const getWhatsappShareUrl = (text: string, url: string = '', isDesktop: boolean = false) => {
  const encodedText = encodeURIComponent(`${text}\n\n${url}`.trim());
  const baseUrl = isDesktop ? 'https://web.whatsapp.com/send' : 'https://api.whatsapp.com/send';
  return `${baseUrl}?text=${encodedText}`;
};
