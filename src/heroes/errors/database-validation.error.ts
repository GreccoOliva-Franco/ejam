export class DatabaseValidationError extends Error {
  public errors: string[];

  constructor(errors: string[]) {
    super('Database invalid insert');
    this.errors = errors;
  }
}
