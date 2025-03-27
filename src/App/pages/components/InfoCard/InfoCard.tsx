import React from 'react';
import './Card.css';
import Text from '../../../components/Text/Text';

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
    const actualClassName = `card ${className}`
    return (
        <div className={actualClassName} onClick={onClick}>
            <img src={image} alt='картинка' />
            <div className="info">
                <div className="description">
                    {captionSlot && <p className="pb-8 captionSlot" >{captionSlot}</p>}
                    <Text className="pb-8" view={'p-20'} weight='medium' maxLines={2} color='primary'>{title}</Text>
                    <Text className="pb-8" view={'p-16'} weight='normal' maxLines={3} color='secondary'>{subtitle}</Text>
                </div>

                <div className="buyInfo">
                    <div className='price'>
                        ${contentSlot}
                    </div>
                    <div>{actionSlot}</div>
                </div>
            </div>


        </div>
    )
};

export default InfoCard;