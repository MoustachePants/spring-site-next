import React from 'react';
import './TagsList.css';
import Tag from '../ui/Tag/Tag';
import Icons from '@/style/icons';
import { Spring } from '@/models/types/spring';

type TagsListProps = {
  spring: Spring;
  limit?: number;
};

type TagName = 'typeOf' | 'hasShadow' | 'IsAccessible' | 'isHotSpring' | 'hasView';

const TagsList: React.FC<TagsListProps> = ({ spring, limit = 4 }) => {
  const [tags, setTags] = React.useState<TagName[]>([]);

  React.useEffect(() => {
    const tags: TagName[] = [];
    if (spring.springDetails.typeOf) tags.push('typeOf');
    if (spring.springDetails.hasShadow) tags.push('hasShadow');
    if (spring.springDetails.IsAccessible) tags.push('IsAccessible');
    if (spring.springDetails.isHotSpring) tags.push('isHotSpring');
    if (spring.springDetails.hasView) tags.push('hasView');
    setTags(tags.slice(0, limit));
  }, [spring]);

  const getIcon = (tag: TagName) => {
    switch (tag) {
      case 'typeOf':
        return <Icons.waves />;
      case 'hasShadow':
        return <Icons.shadow />;
      case 'IsAccessible':
        return <Icons.accessible />;
      case 'isHotSpring':
        return <Icons.waves />;
      case 'hasView':
        return <Icons.flower />;
      default:
        return null;
    }
  };

  const getLabel = (tag: TagName) => {
    switch (tag) {
      case 'typeOf':
        return spring.springDetails.typeOf;
      case 'hasShadow':
        return 'מוצל';
      case 'IsAccessible':
        return 'נגיש';
      case 'isHotSpring':
        return 'מעיין חם';
      case 'hasView':
        return 'נוף';
      default:
        return '';
    }
  };

  return (
    <section className="tags-list">
      {tags.map((tag) => (
        <Tag key={tag} label={getLabel(tag)} icon={getIcon(tag)} />
      ))}
    </section>
  );
};

export default TagsList;
