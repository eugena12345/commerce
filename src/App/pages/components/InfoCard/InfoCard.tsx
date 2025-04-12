import React, { memo } from 'react';
import styles from './Card.module.scss';
import Text from 'components/Text/Text';
import { useNavigate } from 'react-router';
import { routes } from "config/routes.config";

export type CardProps = {
    className?: string,
    image: string;
    captionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
    itemDocumentId: string;
};

// styles:
// card
// cardBuyInfo
// cardCaption
// cardDescription
// cardImage
// cardInfo
// cardPrice
// cardTitle

const InfoCard: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot, itemDocumentId }) => {
    const actualClassName = `${styles.card} ${className? className : ''}`;
    const navigate = useNavigate();
    return (
        <div className={actualClassName} onClick={onClick? onClick : () => navigate(routes.product.create(itemDocumentId))}> 
            <img src={image} alt='картинка' className={styles.cardImage} />
            <div className={styles.cardInfo}>
                <div className={styles.cardDescription}>
                    {captionSlot && <p className={styles.cardCaption}>{captionSlot}</p>}
                    <div className={styles.cardTitle}>
                    <Text className="pb-8" view={'p-20'} weight='medium' maxLines={2} color='primary'>{title}</Text>
                    </div>
                    <Text className="pb-8" view={'p-16'} weight='normal' maxLines={3} color='secondary'>{subtitle}</Text>
                </div>

                <div className={styles.cardBuyInfo}>
                    <div className={styles.cardPrice}>
                        ${contentSlot}
                    </div>
                    <div>{actionSlot}</div>
                </div>
            </div>


        </div>
    )
};

export default memo(InfoCard) ;