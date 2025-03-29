import React from 'react';
// import myImg from './Size=l.svg'
//import styles from './Loader.module.scss';

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
    // const loadingSize  = {
    //     s: '16px',
    //     m: '32px',
    //     l: '40px',
    // }

    const loaderSize = {
        s: '24px',
        m: '48px',
        l: '60px',
    }
    return (
        <div className={className} style={{ width: loaderSize[size], height: loaderSize[size] }}>
<svg width={loaderSize[size]} height={loaderSize[size]} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33.3741 44.6155C25.3022 46.4791 17.2479 41.4462 15.3843 33.3742C13.5207 25.3023 18.5536 17.248 26.6256 15.3844C34.6975 13.5209 42.7518 18.5538 44.6154 26.6257L49.4873 25.501C47.0025 14.7384 36.2634 8.02783 25.5008 10.5126C14.7382 12.9973 8.02771 23.7364 10.5124 34.499C12.9972 45.2616 23.7363 51.9721 34.4989 49.4874L33.3741 44.6155Z" fill="currentColor"/>
</svg>
            {/* <img src={myImg} alt="" style={{ width: loaderSize[size], height: loaderSize[size]}}/> */}
        </div>
    )
};

export default Loader;

