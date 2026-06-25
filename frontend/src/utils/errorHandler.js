import toast from "react-hot-toast";

export function handleApiError(error) {
  console.error(error);
  toast.error(
    error?.response?.data?.detail ||
    "Something went wrong"
  );
}
