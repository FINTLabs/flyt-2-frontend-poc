import React from 'react';
import { Box, Detail, HStack } from '@navikt/ds-react';
import { NodeLabel } from '../NodeLabel';

interface BaseNodeWrapperProps {
  children: React.ReactNode;
  showPosition?: boolean;
  positionAbsoluteX?: number;
  positionAbsoluteY?: number;
  label?: string;
  minHeight?: string;
  margin?: string;
}

export const BaseNodeWrapper: React.FC<BaseNodeWrapperProps> = ({
  children,
  showPosition = false,
  positionAbsoluteX,
  positionAbsoluteY,
  label,
  minHeight,
  margin = '2'
}) => {
  return (
    <Box style={{ minHeight, margin }}>
      {label && (
       <NodeLabel label={label} />
      )}
      
      {showPosition && (
        <HStack style={{ position: 'absolute', bottom: -40, left: 0 }} wrap={false}>
          <Detail>
            x:{positionAbsoluteX} y:{positionAbsoluteY}
          </Detail>
        </HStack>
      )}
      
      {children}
    </Box>
  );
};
