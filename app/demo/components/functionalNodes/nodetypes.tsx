import type { NodeTypes } from '@xyflow/react';
import { IntegrationNode } from '~/demo/components/functionalNodes/IntegrationNode';
import { OperationNode } from '~/demo/components/functionalNodes/OperationNode';
import { InputVariableNode } from '~/demo/components/functionalNodes/InputVariableNode';
import { JoinTextOperationNode } from '~/demo/components/functionalNodes/JoinTextOperationNode';
import { OperationOpenObjectNode } from '~/demo/components/functionalNodes/OperationOpenObjectNode';
import { InnerFlowListOperation } from '~/demo/components/functionalNodes/OperationListInnerFlowNode';
import { InnerFlowDataNode } from '~/demo/components/functionalNodes/InnerFlowDataNode';
import { DataSourceNode } from '~/demo/components/functionalNodes/DataSourceNode';
import { EditTextNode } from '~/demo/components/functionalNodes/EditTextNode';

export const nodeTypes: NodeTypes = {
    flowInput: IntegrationNode,
    operation: OperationNode,
    variableInput: InputVariableNode,
    externalFunction: OperationNode,
    flowOutput: IntegrationNode,
    operationJoinText: JoinTextOperationNode,
    openObject: OperationOpenObjectNode,
    createObject: OperationOpenObjectNode,
    listOperation: InnerFlowListOperation,
    innerFlowInput: InnerFlowDataNode,
    innerFlowOutput: InnerFlowDataNode,
    dataSource: DataSourceNode,
    operationEditText: EditTextNode,
};
