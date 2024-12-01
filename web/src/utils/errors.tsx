import { toast } from "sonner";

export const errorToast = (message: string, e?: Partial<{message?:string}>) => {
  return toast(message, {
    description: e?.message,
    action: {
      label: "copy",
      onClick: () =>
        navigator.clipboard.writeText(
          JSON.stringify({
            text: message,
            message: e?.message,
          })
        ),
    },
  });
};