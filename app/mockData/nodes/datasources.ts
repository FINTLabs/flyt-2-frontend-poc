import type { Node } from '@xyflow/react';
import type { SelectNodeData } from '~/types/nodeTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { defaultPosition } from '~/utils/constants';
import { saksmappetypeOptions } from '~/mockData/datasources/saksmappetype';
import { administrativenhetOptions } from '~/mockData/datasources/administrativenhet';
import { arkivdelOptions } from '~/mockData/datasources/arkivdel';
import { saksstatusOption } from '~/mockData/datasources/saksstatus';
import { tilgangsgruppeOptions } from '~/mockData/datasources/tilgangsgruppe';
import { arkivressursOptions } from '~/mockData/datasources/arkivressurs';

export const dataSourceBaseNode: Node<SelectNodeData> = {
    id: 'dataSource',
    type: 'dataSource',
    data: {
        label: '',
        value: '',
        options: [],
        type: DataTypeDefinition.Reference,
        sourceHandles: [{ id: 'a', type: DataTypeDefinition.Text, required: true }],
    },
    position: defaultPosition,
};

export const dataSourceSaksmappe: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceSaksmappe',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Saksmappetype',
        options: saksmappetypeOptions,
    },
};

export const dataSourceAdminEnhet: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceAdminEnhet',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Administrativ enhet',
        options: administrativenhetOptions,
    },
};

export const dataSourceSaksansvarlig: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceSaksansvarlig',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Saksansvarlig',
        options: arkivressursOptions,
    },
};

export const dataSourceArkivdel: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceArkivdel',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Arkivdel',
        options: arkivdelOptions,
    },
};

export const dataSourceSaksstatus: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceSaksstatus',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Saksstatus',
        options: saksstatusOption,
    },
};

export const dataSourceTilgangsgruppe: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceTilgangsgruppe',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Tilgangsgruppe',
        options: tilgangsgruppeOptions,
    },
};

export const allDataSources = [
    dataSourceSaksmappe,
    dataSourceAdminEnhet,
    dataSourceSaksansvarlig,
    dataSourceArkivdel,
    dataSourceSaksstatus,
    dataSourceTilgangsgruppe,
];
