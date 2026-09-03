import { toast } from "sonner";

export const ToastPromise = (res: any) => {
  toast.promise(res, {
    loading: "Loading...",
    success: (data: { message: string }) => data.message,
    error: (error) => {
      return error.response?.data?.message ?? "Something went wrong";
    },
  });
};
