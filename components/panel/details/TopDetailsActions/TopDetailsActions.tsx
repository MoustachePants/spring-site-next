import React from 'react';
import './TopDetailsActions.css';
import Icons from '@/style/icons';
import { useShare } from '@/hooks/useShare';
import { useDataContext } from '@/context/DataContext';
import { useMobileSize } from '@/hooks/useMobileSize';
import { copyToClipboard } from '@/utils/share';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown/Dropdown';
import {
  Link as LinkIcon,
} from 'iconoir-react';
import toast from 'react-hot-toast';
import ShareOptions from '@/resources/shareOptions';

type TopDetailActionsProp = {
  scrollToUpdates: () => void;
};

const TopDetailsActions: React.FC<TopDetailActionsProp> = ({ scrollToUpdates }) => {
  const { share } = useShare();
  const { selectedSpring } = useDataContext();
  const isMobile = useMobileSize();

  const title = 'המעיין הנובע';
  const text = `צפו במעיין ${selectedSpring?.name}`;
  const url = typeof window !== 'undefined' ? decodeURI(window.location.href) : '';

  const handleNativeShare = () => {
    share({
      title,
      text,
      url,
    });
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      toast.success('הקישור הועתק!');
    }
  };

  const handleNavigation = () => {
    const lat = selectedSpring?.location.coordinates.pool[0];
    const lng = selectedSpring?.location.coordinates.pool[1];
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="spring-details-header-actions">
      <div className="spring-details-header-action" onClick={scrollToUpdates}>
        <Icons.updates />
        <span>עדכונים</span>
      </div>
      <div className="spring-details-header-action" onClick={handleNavigation}>
        <Icons.navigation />
        <span>ניווט</span>
      </div>
      {isMobile ? (
        <div className="spring-details-header-action" onClick={handleNativeShare}>
          <Icons.share />
          <span>שתף</span>
        </div>
      ) : (
        <Dropdown
          ariaLabel="אפשרויות שיתוף"
          align="left"
          trigger={
            <div className="spring-details-header-action">
              <Icons.share />
              <span>שתף</span>
            </div>
          }
        >
          <DropdownItem onClick={handleCopyLink} icon={<LinkIcon color="var(--primary-color)" />} />
          {
            ShareOptions.map((option: any) => (
              <DropdownItem
                key={option.name}
                as={option.as}
                url={url}
                title={text}
                icon={option.icon}
              />
            ))
          }
        </Dropdown>
      )}
    </div>
  );
};

export default TopDetailsActions;
