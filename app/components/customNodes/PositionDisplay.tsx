import React from 'react';
import { Detail, HStack } from '@navikt/ds-react';

interface PositionDisplayProps {
  x: number;
  y: number;
  position?: 'top' | 'bottom';
}

export const PositionDisplay: React.FC<PositionDisplayProps> = ({ 
  x, 
  y, 
  position = 'bottom' 
}) => {
  const style = position === 'top' 
    ? { position: 'absolute' as const, top: -25, left: 0 }
    : { position: 'absolute' as const, bottom: -40, left: 0 };

  return (
    <HStack style={style} wrap={false}>
      <Detail>x: {x}</Detail>
      <Detail>y: {y}</Detail>
    </HStack>
  );
};
