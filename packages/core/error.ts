export class ApiError extends Error {
    constructor(public message: string, public statusCode?: number, public description?: string) {
      super(message);
      const actualProto = new.target.prototype;
      Object.setPrototypeOf(this, actualProto);
    }
  }
  
  export class EntityNotFound extends ApiError {
    constructor(public entityName: string, public id: string | number) {
      super(`Entity [${entityName}] : ${id} not found `, 404, 'Entity not found');
    }
  }
  