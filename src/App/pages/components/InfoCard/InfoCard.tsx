import React from 'react';
import styles from './Card.module.scss';
import Text from 'components/Text/Text';

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const InfoCard: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot,  }) => {
    //...rest
    const actualClassName = `${styles.card} ${className}`
    return (
        <div className={actualClassName} onClick={onClick}>
            <img src={image} alt='картинка' />
            <div className={styles.info}>
                <div className={styles.description}>
                    {captionSlot && <p className={styles.captionSlot}>{captionSlot}</p>}
                    <Text className="pb-8" view={'p-20'} weight='medium' maxLines={2} color='primary'>{title}</Text>
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

export default InfoCard;