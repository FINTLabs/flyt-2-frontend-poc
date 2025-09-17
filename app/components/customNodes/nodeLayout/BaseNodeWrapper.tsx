import React from 'react';
import { Box, Detail, HStack } from '@navikt/ds-react';
import { NodeLabel } from './NodeLabel';
import { PositionDisplay } from './PositionDisplay';

interface BaseNodeWrapperProps {
  children: React.ReactNode;
  label?: string;
  minHeight?: string;
  margin?: string;
}

export const BaseNodeWrapper: React.FC<BaseNodeWrapperProps> = ({
  children,
  label,
  minHeight,
  margin = '2'
}) => {
  return (
    <Box style={{ minHeight, margin }}>
      {label && (
       <NodeLabel label={label} />
      )}
      {children}
    </Box>
  );
};
