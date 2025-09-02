import React from 'react';

interface TypeOperationObjectIconProps {
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function DataTypeText({
    width = 15,
    height = 15,
    className,
    style,
}: TypeOperationObjectIconProps) {
    return (
        <svg
            width={`${width}px`}
            height={`${height}px`}
            className={className}
            style={style}
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1441_69928)">
                <path
                    d="M2 3.5V5.7H5.94737V14.5H8.31579V5.7H12.2632V3.5H2ZM17 7.16667H9.89474V9.36667H12.2632V14.5H14.6316V9.36667H17V7.16667Z"
                    fill="black"
                />
            </g>
            <defs>
                <clipPath id="clip0_1441_69928">
                    <rect width="20" height="17" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
