import { handleUnsuccessfulResponse } from "@/lib/helpers";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  constructor(
    private baseURL: string,
    private token?: () => Promise<string | null>,
  ) {}

  private async getAuthHeaders(): Promise<Record<string, string>> {
    return this.token ? { Authorization: `Bearer ${await this.token()}` } : {};
  }

  private async getHeaders(
    headers: Record<string, string>,
    contentType?: string,
  ): Promise<Record<string, string>> {
    return {
      ...(contentType ? { "Content-Type": contentType } : {}),
      ...headers,
      ...(await this.getAuthHeaders()),
    };
  }

  private async makeRequest<T>(
    url: string,
    method: string,
    body?: unknown,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method,
        headers,
        body: body
          ? body instanceof FormData
            ? body
            : JSON.stringify(body)
          : undefined,
      });
      return this.handleApiResponse<T>(response);
    } catch (error) {
      return this.handleUnsuccessfulResponse<T>(error);
    }
  }

  async get<T>(
    url: string,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(
      url,
      "GET",
      undefined,
      await this.getHeaders(headers),
    );
  }

  async post<T>(
    url: string,
    body: unknown,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    const contentType =
      body instanceof FormData ? "multipart/form-data" : "application/json";
    console.log({ body, contentType });
    return this.makeRequest<T>(
      url,
      "POST",
      body,
      await this.getHeaders(headers, contentType),
    );
  }

  private async handleApiResponse<T>(
    response: Response,
  ): Promise<ApiResponse<T>> {
    if (!response.ok) {
      return handleUnsuccessfulResponse(response);
    }
    const data = await response.json();
    return { success: true, data, error: null, status: response.status };
  }

  private handleUnsuccessfulResponse<T>(error: unknown): ApiResponse<T> {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { data: null, success: false, error: message, status: 500 };
  }
}

export default ApiClient;
