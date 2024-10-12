export type RuleType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email' | 'pattern' | 'any';

export type SyncErrorType = Error | string;
export type SyncValidateResult = boolean | SyncErrorType | SyncErrorType[];
export type ValidateResult = void | Promise<void> | SyncValidateResult;

export interface RuleItem {
    type?: RuleType;
    required?: boolean;
    pattern?: RegExp | string;
    min?: number;
    max?: number;
    len?: number;
    enum?: Array<string | number | boolean | null | undefined>;
    whitespace?: boolean;
    trigger?: string | string[];
    fields?: Record<string, Rule>;
    options?: ValidateOption;
    defaultField?: Rule;
    transform?: (value: Value) => Value;
    message?: string | ((a?: string) => string);
    asyncValidator?: (
        rule: InternalRuleItem,
        value: Value,
        callback: (error?: string | Error) => void,
        source: Values,
        options: ValidateOption,
    ) => void | Promise<void>;
    validator?: (
        rule: InternalRuleItem,
        value: Value,
        callback: (error?: string | Error) => void,
        source: Values,
        options: ValidateOption,
    ) => SyncValidateResult | void;
}
    
export type Rule = RuleItem | RuleItem[];
    
export type Rules = Record<string, Rule>;

type ValidateMessage<T extends any[] = unknown[]> = string| ((...args: T) => string);
type FullField = string | undefined;
type EnumString = string | undefined;
type Pattern = string | RegExp | undefined;
type Range = number | undefined;
type Type = string | undefined;

export interface ValidateMessages {
    default?: ValidateMessage;
    required?: ValidateMessage<[FullField]>;
    enum?: ValidateMessage<[FullField, EnumString]>;
    whitespace?: ValidateMessage<[FullField]>;
    date?: {
        format?: ValidateMessage;
        parse?: ValidateMessage;
        invalid?: ValidateMessage;
    };
    types?: {
        string?: ValidateMessage<[FullField, Type]>;
        method?: ValidateMessage<[FullField, Type]>;
        array?: ValidateMessage<[FullField, Type]>;
        object?: ValidateMessage<[FullField, Type]>;
        number?: ValidateMessage<[FullField, Type]>;
        date?: ValidateMessage<[FullField, Type]>;
        boolean?: ValidateMessage<[FullField, Type]>;
        integer?: ValidateMessage<[FullField, Type]>;
        float?: ValidateMessage<[FullField, Type]>;
        regexp?: ValidateMessage<[FullField, Type]>;
        email?: ValidateMessage<[FullField, Type]>;
        url?: ValidateMessage<[FullField, Type]>;
        hex?: ValidateMessage<[FullField, Type]>;
    };
    string?: {
        len?: ValidateMessage<[FullField, Range]>;
        min?: ValidateMessage<[FullField, Range]>;
        max?: ValidateMessage<[FullField, Range]>;
        range?: ValidateMessage<[FullField, Range, Range]>;
    };
    number?: {
        len?: ValidateMessage<[FullField, Range]>;
        min?: ValidateMessage<[FullField, Range]>;
        max?: ValidateMessage<[FullField, Range]>;
        range?: ValidateMessage<[FullField, Range, Range]>;
    };
    array?: {
        len?: ValidateMessage<[FullField, Range]>;
        min?: ValidateMessage<[FullField, Range]>;
        max?: ValidateMessage<[FullField, Range]>;
        range?: ValidateMessage<[FullField, Range, Range]>;
    };
    pattern?: {
        mismatch?: ValidateMessage<[FullField, Value, Pattern]>;
    };
}

export interface ValidateOption {
    suppressWarning?: boolean;
    first?: boolean;
    firstFields?: boolean | string[];
    messages?: Partial<ValidateMessages>;
    keys?: string[];
    error?: (rule: InternalRuleItem, message: string) => ValidateError;
}

export interface InternalValidateMessages extends ValidateMessages {
    clone: () => InternalValidateMessages;
}

export type Value = any;
export type Values = Record<string, Value>;

export interface ValidateError {
    message?: string;
    fieldValue?: Value;
    field?: string;
}

export type ValidateFieldsError = Record<string, ValidateError[]>;

export type ValidateCallback = (
    errors: ValidateError[] | null,
    fields: ValidateFieldsError | Values
) => void;

export interface RuleValuePackage {
    rule: InternalRuleItem;
    value: Value;
    source: Values;
    field: string;
}

export type ExecuteRule = (
    rule: InternalRuleItem,
    value: Value,
    source: Values,
    errors: string[],
    options: ValidateOption,
    type?: string,
) => void;

export type ExecuteValidator = (
    rule: InternalRuleItem,
    value: Value,
    callback: (error?: string[]) => void,
    source: Values,
    options: ValidateOption,
) => void;

export interface InternalRuleItem extends Omit<RuleItem, 'validator'> {
    field?: string;
    fullField?: string;
    fullFields?: string[];
    validator?: RuleItem['validator'] | ExecuteValidator;
}