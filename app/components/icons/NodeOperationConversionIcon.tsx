import React from 'react';

interface TypeOperationObjectIconProps {
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function NodeOperationConversionIcon({
    width = 44,
    height = 44,
    className,
    style,
}: TypeOperationObjectIconProps) {
    return (
        <svg
            width={`${width}px`}
            height={`${height}px`}
            className={className}
            style={style}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M22 0C9.856 0 0 9.856 0 22C0 34.144 9.856 44 22 44C34.144 44 44 34.144 44 22C44 9.856 34.144 0 22 0ZM22.132 37.4V32.978C22.088 32.978 22.044 32.978 22 32.978C19.184 32.978 16.368 31.9 14.212 29.766C10.45 26.004 9.988 20.196 12.804 15.928L15.224 18.348C13.662 21.274 14.058 24.97 16.522 27.434C18.062 28.974 20.086 29.7 22.11 29.656V24.948L28.336 31.174L22.132 37.4ZM31.174 28.072L28.754 25.652C30.316 22.726 29.92 19.03 27.456 16.566C25.938 15.048 23.98 14.3 22 14.3C21.956 14.3 21.912 14.3 21.868 14.3V19.03L15.642 12.826L21.868 6.6V11.044C24.728 11 27.61 12.034 29.788 14.234C33.528 17.974 33.99 23.804 31.174 28.072Z"
                fill="black"
            />
        </svg>
    );
}
