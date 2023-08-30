export class ArrayError extends Error {
	constructor(
		public errors: string[],
		message?: string
	) {
		super(message);
		this.name = 'ArrayError';
		Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
	}
}
