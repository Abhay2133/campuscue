  "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const questionSchema = z.object({
  title: z.string().min(5, {
    message: "Question Title must be at least 5 characters.",
  }),
  body: z.string().min(5, {
    message: "Question Body must be at least 5 characters.",
  }),
});

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function QuestionForm({
  onSubmit,
  defaultValues
}: {
  onSubmit: (values: z.infer<typeof questionSchema>) => void;
  defaultValues: z.infer<typeof questionSchema>;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

        {/* Title Input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Briefly describe your question
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Body Input */}
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea placeholder="Description of the question" {...field} />
              </FormControl>
              <FormDescription>
                Properly describe your question here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
