// Перечисление методов HTTP-запроса
export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
}

// Параметры запроса
export type RequestParams<ReqT> = {
  method: HTTPMethod; // Метод запроса, GET или POST
  endpoint: string; // API-endpoint, на который делается запрос
  headers: Record<string, string>; // Объект с передаваемыми HTTP-заголовками
  data: ReqT;
};

// Перечисление статусов ответа
export enum StatusHTTP {
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
}

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
  | {
      success: true;
      data: SuccessT;
      status: number;
    }
  | {
      success: false;
      data: ErrorT;
      status: number;
    }
  | {
      success: false;
      data: any;
      status: StatusHTTP;
    };

// Интерфейс для класса, с помощью которого можно делать запросы к API
export interface IApiStore {
  // базовый url для выполнения запросов.
  readonly baseUrl: string;

  // Метод, с помощью которого делается запрос.
  request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>>;
}
