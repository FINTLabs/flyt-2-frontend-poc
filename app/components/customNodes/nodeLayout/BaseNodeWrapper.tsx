import React from 'react';
import { Box, Detail, HStack } from '@navikt/ds-react';
import { NodeLabel } from './NodeLabel';
import { PositionDisplay } from './PositionDisplay';

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
      
      {false && (
        <PositionDisplay x={positionAbsoluteX || 0} y={positionAbsoluteY || 0} position="bottom" />
      )}
      
      {children}
    </Box>
  );
};
