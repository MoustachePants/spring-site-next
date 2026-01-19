import {
    WhatsappShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    TwitterShareButton,
    TelegramShareButton,
} from 'next-share';
import {
    Whatsapp,
    Facebook,
    Twitter,
    Telegram,
    SendDiagonal,
} from 'iconoir-react';

const ShareOptions = [
    {
        name: 'whatsapp',
        as: WhatsappShareButton,
        icon: <Whatsapp color="#25D366" />,
    },
    {
        name: 'facebook',
        as: FacebookShareButton,
        icon: <Facebook color="#1877F2" />,
    },
    {
        name: 'messenger',
        as: FacebookMessengerShareButton,
        icon: <SendDiagonal color="#0084FF" />,
        appId: '2311124445882255',
    },
    {
        name: 'twitter',
        as: TwitterShareButton,
        icon: <Twitter color="#1DA1F2" />,
    },
    {
        name: 'telegram',
        as: TelegramShareButton,
        icon: <Telegram color="#26A5E4" />,
    },
];

export default ShareOptions;
