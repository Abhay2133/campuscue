import { KeyedMutator } from "swr";
import { Button } from "./ui/button";

export default function ErrorFC({
  mutate,
  isValidating,
  message,
}: {
  mutate: KeyedMutator<unknown>;
  isValidating: boolean;
  message: string;
}) {
  return (
    <div className="text-center">
      <p className="text-red-600">{message}</p>
      <Button
        variant="outline"
        onClick={() => mutate()} // Retry fetching
        disabled={isValidating} // Disable if retry is in progress
        className="mt-4"
      >
        {isValidating ? "Retrying..." : "Retry"}
      </Button>
    </div>
  );
}
