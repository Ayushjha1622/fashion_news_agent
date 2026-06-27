import toast from "react-hot-toast";

export function handleApiError(error) {
  console.error(error);
  
  let msg = "Something went wrong";
  if (error?.response?.data?.detail) {
    if (typeof error.response.data.detail === 'string') {
      msg = error.response.data.detail;
    } else if (Array.isArray(error.response.data.detail)) {
      msg = error.response.data.detail.map(d => d.msg || JSON.stringify(d)).join(", ");
    } else {
      msg = JSON.stringify(error.response.data.detail);
    }
  } else if (error?.response?.data?.message) {
    msg = error.response.data.message;
  }
  
  toast.error(msg);
}
