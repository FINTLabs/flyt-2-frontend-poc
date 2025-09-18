import type { NodeTypes } from '@xyflow/react';
import { IntegrationNode } from '~/components/customNodes/IntegrationNode';
import { OperationNode } from '~/components/customNodes/OperationNode';
import { InputVariableNode } from '~/components/customNodes/functionalNodes/InputVariableNode';
import { JoinTextOperationNode } from '~/components/customNodes/functionalNodes/JoinTextOperationNode';
import { OperationOpenObjectNode } from '~/components/customNodes/functionalNodes/OperationOpenObjectNode';
import { InnerFlowListOperation } from '~/components/customNodes/functionalNodes/OperationListInnerFlowNode';
import { InnerFlowDataNode } from '~/components/customNodes/functionalNodes/InnerFlowDataNode';
import { DataSourceNode } from '~/components/customNodes/functionalNodes/DataSourceNode';
import { EditTextNode } from '~/components/customNodes/functionalNodes/EditTextNode';

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