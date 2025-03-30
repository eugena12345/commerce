import React, { memo } from 'react';
import styles from './Card.module.scss';
import Text from 'components/Text/Text';

export type CardProps = {
    className?: string,
    image: string;
    captionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
};

const InfoCard: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot,  }) => {
    const actualClassName = `${styles.card} ${className}`
    return (
        <div className={actualClassName} onClick={onClick}>
            <img src={image} alt='картинка' />
            <div className={styles.info}>
                <div className={styles.description}>
                    {captionSlot && <p className={styles.captionSlot}>{captionSlot}</p>}
                    <div className={styles.titleDescroption}>
                    <Text className="pb-8" view={'p-20'} weight='medium' maxLines={2} color='primary'>{title}</Text>
                    </div>
                    <Text className="pb-8" view={'p-16'} weight='normal' maxLines={3} color='secondary'>{subtitle}</Text>
                </div>

                <div className={styles.buyInfo}>
                    <div className={styles.price}>
                        ${contentSlot}
                    </div>
                    <div>{actionSlot}</div>
                </div>
            </div>


        </div>
    )
};

export default memo(InfoCard) ;