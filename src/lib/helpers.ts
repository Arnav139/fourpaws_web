export const handleUnsuccessfulResponse = async (response: Response) => {
  let resData: {
    error?: string;
    errors?: string[];
    message?: string;
  };

  try {
    resData = await response.json();
  } catch {
    resData = {};
  }

  let errorMessage =
    resData?.error ||
    resData?.message ||
    response.statusText ||
    (resData?.errors?.length ? resData.errors[0] : undefined);

  if (!errorMessage) {
    switch (response.status) {
      case 401: // Handle 401 Unauthorized
        errorMessage = "Your session has expired. Please login again.";
        break;
      case 403: // Handle 403 Forbidden
        errorMessage = "You don't have permission to access this resource.";
        break;
      case 404: // Handle 404 Not Found
        errorMessage = "The requested resource was not found.";
        break;
      default:
        if (response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
        break;
    }
  }

  return {
    success: false,
    data: null,
    status: response.status,
    error: errorMessage || "An unexpected error occurred",
  };
};
