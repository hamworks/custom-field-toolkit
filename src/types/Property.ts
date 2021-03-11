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

interface ArrayProps extends ApiProp {
	type: 'array';
	default: unknown[];
}

export type Property = StringProp | NumberProp | BooleanProp | ArrayProps;
