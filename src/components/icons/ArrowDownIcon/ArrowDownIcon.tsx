import * as React from 'react';
import { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props)  => {
    const getClassNames = () => {
        const resultClassnames: string[] = [];
        if (props.className) {
            resultClassnames.push(props.className);
        }
        if (props.color) {
            resultClassnames.push(props.color);
        }
        return resultClassnames.join(' ');
    }
    return (
        <svg className={getClassNames()}
            width={props.width || 24}
            height={props.height || 24} 
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" fill="currentColor" />
        </svg>

    )
}

export default ArrowDownIcon;
