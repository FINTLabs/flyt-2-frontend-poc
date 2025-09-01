import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { Box, Detail, HStack } from '@navikt/ds-react';
import type { HandleData } from '~/types/handleTypes';
import { calculateHandlePosition, getTypeSymbol, getTypeSymbolWidth, measureTextWidth } from '~/utils/nodeHandlers';

export type MultipleHandlesWithLabelProps = {
    handles?: HandleData[];
    type: 'target' | 'source';
    isConnectable: boolean;
    x?: number;
    y?: number;
};

export const MultipleHandlesWithLabel = ({
    handles,
    type,
    isConnectable,
}: MultipleHandlesWithLabelProps) => {
    if (!handles?.length) return null;

    return (
        <>
            {handles.map((handle, index) => {
                const typeTagWidth = getTypeSymbolWidth(handle.type, handle.typeName);
                const labelWidth = handle.label ? Math.max(10, measureTextWidth(handle.label)) : 0;
                const totalWidth = Math.max(16, typeTagWidth + (handle.label ? labelWidth + 16 : 8));

                const transform = (type === 'target')
                    ? (handles.length > 1 ? 'translateX(-100%)' : 'translate(-100%, -50%)')
                    : (handles.length > 1 ? 'translateX(100%)' : 'translate(100%, -50%)');

                return (
                    <Handle
                        key={handle.id}
                        id={handle.id}
                        type={type}
                        position={type === 'target' ? Position.Left : Position.Right}
                        isConnectable={isConnectable}
                        style={{
                            top: calculateHandlePosition(index, handles.length),
                            width: totalWidth,
                            height: 23,
                            padding: '2px',
                            zIndex: 2,
                            backgroundColor: 'var(--a-bg-default)',
                            borderWidth: '1px',
                            borderRadius: '4px',
                            borderColor: 'var(--a-border-subtle)',
                            right: type === 'source' ? '-5px' : undefined,
                            left: type === 'target' ? '-5px' : undefined,
                            transform: transform,
                            textAlign: 'left',
                            alignContent: 'center',
                        }}>
                        <HStack gap="1" align="center" wrap={false} paddingInline={`0 ${handle.label ? '1' : '0'}`}>
                            <Box
                                borderWidth="1"
                                borderRadius="2"
                                borderColor="border-default"
                                background="surface-subtle"
                                style={{
                                    borderStyle: handle.required ? 'solid' : 'dashed',
                                }}
                            >
                                {getTypeSymbol(handle.type, handle.typeName)}
                            </Box>
                            {handle.label && <Detail style={{ textWrap: 'nowrap', lineHeight: '1rem' }}>{handle.label}</Detail>}
                        </HStack>
                    </Handle>
                );
            })}
        </>
    );
};

