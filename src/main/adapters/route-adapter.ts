import { HttpRequest } from "./http-request";
import { ResponseHandler } from "./http-response";

export const adaptRoute = (
  controller: (data: HttpRequest) => Promise<ResponseHandler>
) => {
  return async (data: any) => {
    try {
      const httpRequest: HttpRequest = {
        body: data.body,
        headers: data.headers,
        params: data.params,
        query: data.query,
        user: data.user,
      };

      const response = (await controller(httpRequest)).handle();

      return new Response(JSON.stringify(response.body), {
        status: response.status_code,
        statusText: response.response_type,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      if (error instanceof ResponseHandler) {
        const handle = error.handle();

        return new Response(JSON.stringify(handle), {
          status: handle.status_code,
          statusText: handle.response_type,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  };
};
