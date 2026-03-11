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
import { klassifikasjonssystemOptions } from '~/mockData/datasources/klassifikasjonssystem';
import { klasseidOptions } from '~/mockData/datasources/klasseidOptions';
import { journalposttypeOptions } from '~/mockData/datasources/journalposttype';
import { journalstatusOptions } from '~/mockData/datasources/journalstatus';
import { korrespondanseparttypeOptions } from '~/mockData/datasources/korrespondanseparttype';
import { dokumentstatusOptions } from '~/mockData/datasources/dokumentstatus';
import { dokumenttypeOptions } from '~/mockData/datasources/dokumenttype';
import { tilknyttetregistreringsomOptions } from '~/mockData/datasources/tilknyttetregistreringsom';
import { variantformatOptions } from '~/mockData/datasources/variantformat';
import { formatOptions } from '~/mockData/datasources/format';

export const dataSourceBaseNode: Node<SelectNodeData> = {
    id: 'dataSource',
    type: 'dataSource',
    data: {
        label: '',
        value: '',
        options: [],
        type: DataTypeDefinition.Reference,
        sourceHandles: [{ id: 'dataSource:s:a', type: DataTypeDefinition.Text, required: true }],
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
        sourceHandles: [
            { id: 'dataSourceSaksmappe:s:a', type: DataTypeDefinition.Text, required: true },
        ],
    },
};

export const dataSourceAdminEnhet: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceAdminEnhet',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Administrativ enhet',
        options: administrativenhetOptions,
        sourceHandles: [
            { id: 'dataSourceAdminEnhet:s:a', type: DataTypeDefinition.Text, required: true },
        ],
    },
};

export const dataSourceSaksansvarlig: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceSaksansvarlig',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Saksansvarlig',
        options: arkivressursOptions,
        sourceHandles: [
            { id: 'dataSourceSaksansvarlig:s:a', type: DataTypeDefinition.Text, required: true },
        ],
    },
};

export const dataSourceArkivdel: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceArkivdel',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Arkivdel',
        options: arkivdelOptions,
        sourceHandles: [
            { id: 'dataSourceArkivdel:s:a', type: DataTypeDefinition.Text, required: true },
        ],
    },
};

export const dataSourceSaksstatus: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceSaksstatus',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Saksstatus',
        options: saksstatusOption,
        sourceHandles: [
            { id: 'dataSourceSaksstatus:s:a', type: DataTypeDefinition.Text, required: true },
        ],
    },
};

export const dataSourceTilgangsgruppe: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceTilgangsgruppe',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Tilgangsgruppe',
        options: tilgangsgruppeOptions,
        sourceHandles: [
            { id: 'dataSourceTilgangsgruppe:s:a', type: DataTypeDefinition.Text, required: true },
        ],
    },
};

export const dataSourceKlassifikasjonssystem: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceKlassifikasjonssystem',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Klassering: Klassifikasjonssystem',
        options: klassifikasjonssystemOptions,
        sourceHandles: [
            {
                id: 'dataSourceKlassifikasjonssystem:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const dataSourceKlassID: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceKlassID',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Klassering: KlasseID',
        options: klasseidOptions,
        sourceHandles: [
            {
                id: 'dataSourceKlassID:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const dataSourceJournalposttype: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceJournalposttype',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Journalposttype',
        options: journalposttypeOptions,
        sourceHandles: [
            {
                id: 'dataSourceJournalposttype:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const dataSourceJournalpostStatus: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceJournalpostStatus',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Journalpoststatus',
        options: journalstatusOptions,
        sourceHandles: [
            {
                id: 'dataSourceJournalpostStatus:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const dataSourceKorrespondanseparttype: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceKorrespondanseparttype',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Korrespondanseparttype',
        options: korrespondanseparttypeOptions,
        sourceHandles: [
            {
                id: 'dataSourceKorrespondanseparttype:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const dataSourceDokumentstatus: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceDokumentstatus',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Dokumentstatus',
        options: dokumentstatusOptions,
        sourceHandles: [
            {
                id: 'dataSourceDokumentstatus:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const dataSourceDokumenttype: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceDokumenttype',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Dokumenttype',
        options: dokumenttypeOptions,
        sourceHandles: [
            {
                id: 'dataSourceDokumenttype:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const dataSourceTilknyttetRegistreringSom: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceTilknyttetRegistreringSom',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Tilknyttet registrering som',
        options: tilknyttetregistreringsomOptions,
        sourceHandles: [
            {
                id: 'dataSourceTilknyttetRegistreringSom:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const dataSourceVariantformat: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceVariantformat',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Dokumentobjekt: Variantformat',
        options: variantformatOptions,
        sourceHandles: [
            {
                id: 'dataSourceVariantformat:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const dataSourceFormat: Node<SelectNodeData> = {
    ...dataSourceBaseNode,
    id: 'dataSourceFormat',
    data: {
        ...dataSourceBaseNode.data,
        label: 'Dokumentobjekt: Format',
        options: formatOptions,
        sourceHandles: [
            {
                id: 'dataSourceFormat:s:a',
                type: DataTypeDefinition.Text,
                required: true,
            },
        ],
    },
};

export const allDataSources = [
    dataSourceSaksmappe,
    dataSourceAdminEnhet,
    dataSourceSaksansvarlig,
    dataSourceArkivdel,
    dataSourceSaksstatus,
    dataSourceTilgangsgruppe,
    dataSourceKlassifikasjonssystem,
    dataSourceKlassID,
    dataSourceJournalposttype,
    dataSourceJournalpostStatus,
    dataSourceKorrespondanseparttype,
    dataSourceDokumentstatus,
    dataSourceDokumenttype,
    dataSourceTilknyttetRegistreringSom,
    dataSourceVariantformat,
    dataSourceFormat,
];
