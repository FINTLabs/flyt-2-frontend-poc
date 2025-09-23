
export enum DataType {
    Text = 'text',
    Input = 'input',
    Boolean = 'boolean',
    Object = 'object',
    Number = 'number',
    Reference = 'reference',
    File = 'file',
    Undefined = 'undefined',
    CollectionObject = 'collectionObject',
    CollectionUndefined = 'collectionUndefined',
    CollectionText = 'collectionText',
    CollectionNumber = 'collectionNumber',
    CollectionBoolean = 'collectionBoolean',
    CollectionFile = 'collectionFile',
    CollectionReference = 'collectionReference',
}

// Type definition for DataType values
export type DataTypeValue = `${DataType}`;