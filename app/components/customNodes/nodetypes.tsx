import type { NodeTypes } from '@xyflow/react';
import { IntegrationNode } from '~/components/customNodes/IntegrationNode';
import { OperationNode } from '~/components/customNodes/OperationNode';
import { InputTextNode } from '~/components/customNodes/textEditingNodes/InputTextNode';
import { JoinTextOperationNode } from '~/components/customNodes/textEditingNodes/JoinTextOperationNode';
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
    inputText: InputTextNode,
    operationJoinText: JoinTextOperationNode,
    openObject: OperationOpenObjectNode,
    createObject: OperationOpenObjectNode,
    listOperation: InnerFlowListOperation,
    innerFlowInput: InnerFlowDataNode,
    innerFlowOutput: InnerFlowDataNode,
    dataSource: DataSourceNode,
    operationEditText: EditTextNode,
};
