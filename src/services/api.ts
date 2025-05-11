import { handleUnsuccessfulResponse } from "@/lib/helpers";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  constructor(private baseURL: string) {}

  async get<T>(
    url: string,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method: "GET",
        headers: headers,
      });
      return this.handleApiResponse<T>(response);
    } catch (error) {
      return this.handleUnsuccessfulResponse<T>(error);
    }
  }

  async post<T>(
    url: string,
    body: unknown,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });
      return this.handleApiResponse<T>(response);
    } catch (error) {
      return this.handleUnsuccessfulResponse<T>(error);
    }
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
