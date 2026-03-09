import type { NodeTypes } from '@xyflow/react';
import { IntegrationNode } from '~/components/customNodes/IntegrationNode';
import { OperationNode } from '~/components/customNodes/OperationNode';
import { InputVariableNode } from '~/components/customNodes/InputVariableNode';
import { JoinTextOperationNode } from '~/components/customNodes/JoinTextOperationNode';
import { OperationOpenObjectNode } from '~/components/customNodes/OperationOpenObjectNode';
import { InnerFlowListOperation } from '~/components/customNodes/OperationListInnerFlowNode';
import { InnerFlowDataNode } from '~/components/customNodes/InnerFlowDataNode';
import { DataSourceNode } from '~/components/customNodes/DataSourceNode';
import { EditTextNode } from '~/components/customNodes/EditTextNode';

export const nodeTypes: NodeTypes = {
    flowInput: IntegrationNode,
    flowOutput: IntegrationNode,
    operation: OperationNode,
    externalFunction: OperationNode,
    variableInput: InputVariableNode,
    operationJoinText: JoinTextOperationNode,
    openObject: OperationOpenObjectNode,
    createObject: OperationOpenObjectNode,
    listOperation: InnerFlowListOperation,
    innerFlowInput: InnerFlowDataNode,
    innerFlowOutput: InnerFlowDataNode,
    dataSource: DataSourceNode,
    operationEditText: EditTextNode,
};
