
export enum DataType {
    Text = 'text',
    Input = 'input',
    Boolean = 'boolean',
    Object = 'object',
    Number = 'number',
    CollectionObject = 'collectionObject',
    Reference = 'reference',
    File = 'file',
    Undefined = 'undefined',
}

// Type definition for DataType values
export type DataTypeValue = `${DataType}`;