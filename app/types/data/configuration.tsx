export interface IConfiguration {
    id: number;
    integrationId?: number;
    integrationMetadataId?: number;
    version?: number | null;
    completed?: boolean;
    comment?: string;
    mapping: IObjectMapping;
    lastModifiedAt: string;
    lastModifiedBy: string;
}

export interface IConfigurationPatch {
    comment?: string;
    integrationMetadataId?: number;
    completed?: boolean;
    mapping: IObjectMapping;
}

export interface IObjectMapping {
    valueMappingPerKey: Record<string, IValueMapping>;
    valueCollectionMappingPerKey: Record<string, ICollectionMapping<IValueMapping>>;
    objectMappingPerKey: Record<string, IObjectMapping>;
    objectCollectionMappingPerKey: Record<string, ICollectionMapping<IObjectMapping>>;
}

export interface ICollectionMapping<T extends IValueMapping | IObjectMapping> {
    elementMappings: T[];
    fromCollectionMappings: IFromCollectionMapping<T>[];
}

export interface IFromCollectionMapping<T extends IValueMapping | IObjectMapping> {
    instanceCollectionReferencesOrdered: string[];
    elementMapping: T;
}

export interface IValueMapping {
    type: ConfigValueType;
    mappingString: string | null;
}

export enum ConfigValueType {
    STRING = 'STRING',
    URL = 'URL',
    BOOLEAN = 'BOOLEAN',
    DYNAMIC_STRING = 'DYNAMIC_STRING',
    FILE = 'FILE',
    VALUE_CONVERTING = 'VALUE_CONVERTING',
}

// FORM TEMPLATE

export interface IMappingTemplate {
    displayName: string;
    rootObjectTemplate: IObjectTemplate;
}

export interface IObjectTemplate {
    valueTemplates?: IElementTemplate<IValueTemplate>[];
    selectableValueTemplates?: IElementTemplate<ISelectableValueTemplate>[];
    objectTemplates?: IElementTemplate<IObjectTemplate>[];
    valueCollectionTemplates?: IElementTemplate<ICollectionTemplate<IValueTemplate>>[];
    objectCollectionTemplates?: IElementTemplate<ICollectionTemplate<IObjectTemplate>>[];
}

export interface IElementTemplate<
    T extends
        | IValueTemplate
        | ISelectableValueTemplate
        | IObjectTemplate
        | INestedObjectRefTemplate
        | ICollectionTemplate<IValueTemplate | IObjectTemplate>,
> {
    order: number;
    elementConfig: IElementConfig;
    template: T;
}

export interface IValueTemplate {
    type: ConfigValueType;
    search?: IUrlBuilder;
}

export interface IUrlBuilder {
    urlTemplate: string;
    valueRefPerPathParamKey?: Record<string, string>;
    valueRefPerRequestParamKey?: Record<string, string>;
}

export interface ISelectableValueTemplate {
    type: SelectableValueType;
    selectables?: ISelectable[];
    selectablesSources?: IUrlBuilder[];
}

export interface ICollectionTemplate<T> {
    elementTemplate: T;
}

export interface INestedObjectRefTemplate {
    id: string;
}

export interface IElementConfig {
    key: string;
    displayName: string;
    description: string;
    showDependency?: IDependency;
    enableDependency?: IDependency;
}

export interface IDependency {
    hasAnyCombination: IValuePredicate[][];
}

export interface IValuePredicate {
    key: string;
    defined: boolean;
    value?: string;
    notValue?: string;
}

export enum SelectableValueType {
    DROPDOWN = 'DROPDOWN',
    SEARCH_SELECT = 'SEARCH_SELECT',
    DYNAMIC_STRING_OR_SEARCH_SELECT = 'DYNAMIC_STRING_OR_SEARCH_SELECT',
}

export interface ISelectable {
    displayName: string;
    value: string;
}
