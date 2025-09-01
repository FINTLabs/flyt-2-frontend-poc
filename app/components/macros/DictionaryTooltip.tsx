import React, { useState } from 'react';
import { Tooltip, Box } from '@navikt/ds-react';
import { dictionaryData } from '~/mockData/dictionary';

interface DictionaryTooltipProps {
    termId: string;
    children: React.ReactNode;
    className?: string;
}

export const DictionaryTooltip: React.FC<DictionaryTooltipProps> = ({ 
    termId, 
    children, 
    className 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const term = dictionaryData.find(t => t.id === termId);
    
    if (!term) {
        return <span className={className}>{children}</span>;
    }
    
    const tooltipContent = (
        <Box padding="3" maxWidth="300px">
            <div className="font-semibold text-sm mb-2">{term.term}</div>
            <div className="text-sm mb-2">{term.definition}</div>
            {term.examples && term.examples.length > 0 && (
                <div className="text-xs text-gray-600">
                    <div className="font-medium mb-1">Eksempel:</div>
                    <div>{term.examples[0]}</div>
                </div>
            )}
        </Box>
    );
    
    return (
        <Tooltip
            open={isOpen}
            onOpenChange={setIsOpen}
            content={tooltipContent}
        >
            <span 
                className={`cursor-help border-b border-dotted border-gray-400 hover:border-gray-600 ${className || ''}`}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {children}
            </span>
        </Tooltip>
    );
};

// Convenience component for inline usage
export const DictTerm: React.FC<DictionaryTooltipProps> = (props) => (
    <DictionaryTooltip {...props} />
);
