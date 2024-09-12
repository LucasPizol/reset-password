export abstract class ResponseHandler {
  private body: any;
  private status_code: number;
  private response_type: string;

  constructor(body: any, status_code: number, response_type: string) {
    this.body = body;
    this.status_code = status_code;
    this.response_type = response_type;
  }

  handle() {
    return {
      body: this.body,
      status_code: this.status_code,
      response_type: this.response_type,
    };
  }
}

export class Success extends ResponseHandler {
  constructor(body: any) {
    super(body, 200, "success");
  }
}

export class Created extends ResponseHandler {
  constructor(body: any) {
    super(body, 201, "created");
  }
}

export class NoContent extends ResponseHandler {
  constructor(body: any) {
    super(body, 204, "no_content");
  }
}

export class ServerError extends ResponseHandler {
  constructor(body: any) {
    super(body, 500, "internal_server_error");
  }
}

export class Unauthorized extends ResponseHandler {
  constructor(body: any) {
    super(body, 401, "unauthorized");
  }
}

export class Forbidden extends ResponseHandler {
  constructor(body: any) {
    super(body, 403, "forbidden");
  }
}

export class NotFound extends ResponseHandler {
  constructor(body: any) {
    super(body, 404, "not_found");
  }
}

export class BadRequest extends ResponseHandler {
  constructor(body: any) {
    super(body, 400, "bad_request");
  }
}

export class Conflict extends ResponseHandler {
  constructor(body: any) {
    super(body, 409, "conflict");
  }
}

export class UnprocessableEntity extends ResponseHandler {
  constructor(body: any) {
    super(body, 422, "unprocessable_entity");
  }
}
