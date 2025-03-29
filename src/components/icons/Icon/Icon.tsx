import * as React from 'react'
import './Icon.css'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    'data-testid'?: string;
};

// const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ className, color, children, width = '24px', height='24px' }) => {
//     const getClassNames = () => {
//         const resultClassnames: string[] = [];
//         if (className) {
//             resultClassnames.push(className);
//         }
//         if (color) {
//             resultClassnames.push(color);
//         }
//         return resultClassnames.join(' ');
//     }

//     return (
//         <div className={getClassNames()} style={{width: width, height: height}}>
//             {children}
//         </div>
//     )
// }

// export default Icon;
