import { Handle, Position } from '@xyflow/react';
import React, { Fragment, useMemo } from 'react';
import { BodyShort, Detail, HStack, VStack } from '@navikt/ds-react';
import { calculateHandlePosition, measureTextWidthOld } from '~/demo/utils/nodeHandlers';
import { HANDLE_HEIGHT_DEMO } from '~/demo/mockData/constants';
import type { HandleData } from '~/types/flow/edges';
import { getValueTypeSymbolWidth } from '~/utils/dataTypeUtils';
import { TypeTag } from '~/components/macros/TypeTag';
import { getHandlesByCategory } from '~/utils/nodePositionUtils';

export type MultipleHandlesWithLabelProps = {
    handles?: HandleData[];
    type: 'target' | 'source';
    isConnectable: boolean;
    x?: number;
    y?: number;
    totalItems: number;
};

export const MetadataHandles = ({
    handles,
    type,
    isConnectable,
    totalItems,
}: MultipleHandlesWithLabelProps) => {
    if (!handles?.length) return null;

    let handlePositionInList = -1;

    const handlesWithoutCategory = handles.filter((handle) => !handle.categoryName);
    const handlesByCategory = getHandlesByCategory(handles);

    const transform =
        type === 'target'
            ? totalItems > 1
                ? 'translateX(-100%)'
                : 'translate(-100%, -50%)'
            : totalItems > 1
              ? 'translateX(100%)'
              : 'translate(100%, -50%)';

    return (
        <>
            {handlesWithoutCategory.map((handle) => {
                handlePositionInList = handlePositionInList + 1;
                const handlePosition = calculateHandlePosition(handlePositionInList, totalItems);
                return (
                    <MetadataHandleWithLabel
                        key={handle.id}
                        handle={handle}
                        type={type}
                        isConnectable={isConnectable}
                        transform={transform}
                        handlePosition={handlePosition}
                    />
                );
            })}
            {Object.keys(handlesByCategory).map((categoryHandleName) => {
                handlePositionInList = handlePositionInList + 1;
                const handlePosition = calculateHandlePosition(handlePositionInList, totalItems);

                return (
                    <Fragment key={`categoryHandles-${categoryHandleName}`}>
                        <BodyShort
                            size={'small'}
                            style={{
                                position: 'absolute',
                                transform: transform,
                                top: handlePosition,
                                padding: '2px',
                                right: type === 'source' ? '-5px' : undefined,
                                left: type === 'target' ? '-5px' : undefined,
                            }}
                        >
                            {categoryHandleName}
                        </BodyShort>
                        {handlesByCategory[categoryHandleName].map((categoryHandle) => {
                            handlePositionInList = handlePositionInList + 1;
                            const categoryHandlePosition = calculateHandlePosition(
                                handlePositionInList,
                                totalItems
                            );

                            return (
                                <MetadataHandleWithLabel
                                    key={categoryHandle.id}
                                    handle={categoryHandle}
                                    type={type}
                                    isConnectable={isConnectable}
                                    transform={transform}
                                    handlePosition={categoryHandlePosition}
                                    paddingFromNode={'-15px'}
                                />
                            );
                        })}
                    </Fragment>
                );
            })}
        </>
    );
};

export type HandleWithLabelProps = {
    handle: HandleData;
    type: 'target' | 'source';
    isConnectable: boolean;
    transform: string;
    handlePosition: string;
    paddingFromNode?: string;
};

const MetadataHandleWithLabel = ({
    handle,
    type,
    isConnectable,
    transform,
    handlePosition,
    paddingFromNode = '-5px',
}: HandleWithLabelProps) => {
    const memorizedHandleWidth = useMemo(() => {
        const typeTagWidth = getValueTypeSymbolWidth(handle.type, handle.typeName);
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
                right: type === 'source' ? paddingFromNode : undefined,
                left: type === 'target' ? paddingFromNode : undefined,
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
                <TypeTag
                    type={handle.type}
                    typeName={handle.id}
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
