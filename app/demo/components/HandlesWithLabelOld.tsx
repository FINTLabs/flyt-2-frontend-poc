import { Handle, Position } from '@xyflow/react';
import React, { useMemo } from 'react';
import { Detail, HStack } from '@navikt/ds-react';
import type { HandleDataOld } from '~/types/handleTypes';
import {
    calculateHandlePosition,
    getTypeSymbolWidth,
    measureTextWidthOld,
} from '~/demo/utils/nodeHandlers';
import { HANDLE_HEIGHT_DEMO } from '~/demo/mockData/constants';
import { TypeTagOld } from '~/components/macros/TypeTagOld';

export type MultipleHandlesWithLabelProps = {
    handles?: HandleDataOld[];
    type: 'target' | 'source';
    isConnectable: boolean;
    x?: number;
    y?: number;
    hideLabels?: boolean;
};

export const HandlesWithLabelOld = ({
    handles,
    type,
    isConnectable,
    hideLabels = false,
}: MultipleHandlesWithLabelProps) => {
    if (!handles?.length) return null;

    return (
        <>
            {handles.map((handle, index) => {
                const transform =
                    type === 'target'
                        ? handles.length > 1
                            ? 'translateX(-100%)'
                            : 'translate(-100%, -50%)'
                        : handles.length > 1
                          ? 'translateX(100%)'
                          : 'translate(100%, -50%)';

                const handlePosition = calculateHandlePosition(index, handles.length);

                if (hideLabels) {
                    return (
                        <Handle
                            key={handle.id}
                            id={handle.id}
                            type={type}
                            position={type === 'target' ? Position.Left : Position.Right}
                            isConnectable={isConnectable}
                        />
                    );
                }

                return (
                    <HandleWithLabel
                        key={handle.id}
                        handle={handle}
                        type={type}
                        isConnectable={isConnectable}
                        transform={transform}
                        handlePosition={handlePosition}
                    />
                );
            })}
        </>
    );
};

export type HandleWithLabelPropsOld = {
    handle: HandleDataOld;
    type: 'target' | 'source';
    isConnectable: boolean;
    transform: string;
    handlePosition: string;
};

const HandleWithLabel = ({
    handle,
    type,
    isConnectable,
    transform,
    handlePosition,
}: HandleWithLabelPropsOld) => {
    const memorizedHandleWidth = useMemo(() => {
        const typeTagWidth = getTypeSymbolWidth(handle.type, handle.typeName);
        const labelWidth = handle.label ? Math.max(10, measureTextWidthOld(handle.label)) : 0;
        return Math.max(16, typeTagWidth + (handle.label ? labelWidth + 16 : 8));
    }, [handle.label, handle.typeName, handle.type]);

    return (
        <Handle
            key={handle.id}
            id={handle.id}
            type={type}
            position={type === 'target' ? Position.Left : Position.Right}
            isConnectable={isConnectable}
            style={{
                top: handlePosition,
                width: memorizedHandleWidth,
                height: HANDLE_HEIGHT_DEMO,
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
            }}
        >
            <HStack
                gap="1"
                align="center"
                wrap={false}
                paddingInline={`0 ${handle.label ? '1' : '0'}`}
            >
                <TypeTagOld
                    type={handle.type}
                    typeName={handle.typeName}
                    required={handle.required}
                    size="small"
                />
                {handle.label && (
                    <Detail style={{ textWrap: 'nowrap', lineHeight: '1rem' }}>
                        {handle.label}
                    </Detail>
                )}
            </HStack>
        </Handle>
    );
};
