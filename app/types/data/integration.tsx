export interface IIntegration {
    id?: string;
    sourceApplicationId?: string;
    sourceApplicationIntegrationId?: string;
    destination?: string;
    state?: string;
    activeConfigurationId?: string;
    activeConfigurationVersion?: string;
    dispatched?: number;
    errors?: number;
    total?: number;
    displayName?: string;
}

export interface IIntegrationMetadata {
    id: string;
    sourceApplicationId: string;
    sourceApplicationIntegrationId: string;
    sourceApplicationIntegrationUri: string;
    integrationDisplayName: string;
    version: number;
    instanceMetadata?: IInstanceMetadataContent;
}

export interface IInstanceMetadataContent {
    instanceValueMetadata: IInstanceValueMetadata[];
    instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata[];
    categories: IInstanceMetadataCategory[];
}

export interface IInstanceValueMetadata {
    displayName: string;
    type: DataValueType;
    key: string;
}

export interface IInstanceObjectCollectionMetadata {
    displayName: string;
    objectMetadata: IInstanceMetadataContent;
    key: string;
}

export interface IInstanceMetadataCategory {
    displayName: string;
    content: IInstanceMetadataContent;
}

export enum DataValueType {
    STRING = 'STRING',
    BOOLEAN = 'BOOLEAN',
    INTEGER = 'INTEGER',
    EMAIL = 'EMAIL',
    URL = 'URL',
    DATE = 'DATE',
    PHONE = 'PHONE',
    FILE = 'FILE',
    COLLECTION = 'COLLECTION',
    VALUE_CONVERTING = 'VALUE_CONVERTING',
    DATA_OBJECT = 'DATA_OBJECT',
}

export type ValueTypeValue = `${DataValueType}`;
