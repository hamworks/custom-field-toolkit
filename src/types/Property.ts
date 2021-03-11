interface ApiProp {
	description: string;
	type: string;
	required: boolean;
}

interface StringProp extends ApiProp {
	type: 'string';
	default: string;
}

interface NumberProp extends ApiProp {
	type: 'number' | 'integer';
	default: number;
}

interface BooleanProp extends ApiProp {
	type: 'boolean';
	default: boolean;
}

export interface ArrayProps< T extends ApiProp = ApiProp > extends ApiProp {
	type: 'array';
	items: T;
	default: T[];
}

export type Property = StringProp | NumberProp | BooleanProp | ArrayProps;
