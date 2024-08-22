/**
 * Exceptions are used to give more information
 * of an error that has occured
 */
export default class TempleException extends Error {
  /**
   * General use expressive reasons
   */
  static for(message: string, ...values: string[]) {
    values.forEach(function(value) {
      message = message.replace('%s', value);
    });

    return new this(message);
  }

  /**
   * Expressive error report
   */
  static forErrorsFound(errors: ErrorList) {
    const exception = new this('Invalid Parameters');
    exception.errors = errors;
    return exception;
  }

  /**
   * Requires that the condition is true
   */
  static require(
    condition: boolean, 
    message: string, 
    ...values: any[]
  ): void {
    if (!condition) {
      for (const value of values) {
        message = message.replace('%s', value);
      } 

      throw new this(message);
    }
  }

  /**
   * Error code
   */
  public code: number;

  /**
   * Itemized errors
   */
  public errors: ErrorList = {};

  /**
   * Starting index
   */
  public start = 0;

  /**
   * ending index
   */
  public end = 0;

  /**
   * An exception should provide a message and a name
   */
  constructor(message: string, code = 500) {
    super();
    this.message = message;
    this.name = this.constructor.name;
    this.code = code;
  }

  /**
   * Expressive way to set an error code
   */
  withCode(code: number) {
    this.code = code;
    return this;
  }

  /**
   * Expressive way to set syntax position
   */
  withPosition(start: number, end: number) {
    this.start = start;
    this.end = end;
    return this;
  }

  /**
   * Converts error to JSON
   */
  toJSON(): Record<string, any> {
    return {
      error: true,
      code: this.code,
      message: this.message
    };
  }
}

/**
 * Abstraction defining what a list of errors should look like
 */
export type ErrorList = Record<string, string|string[]>;