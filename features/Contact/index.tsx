"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const ContactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type IContactSchema = z.infer<typeof ContactSchema>;

const ContactSectionFeature = () => {
  const form = useForm<IContactSchema>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: IContactSchema) => {
    const body = new URLSearchParams({
      ...data,
      _subject: "New Collaboration Request!",
      _captcha: "false",
      _template: "box",
    });

    try {
      const res = await fetch("https://formsubmit.co/almasrzld@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error("Failed to send message");
      }
    } catch (err) {
      toast.error("An error occurred while sending the message");
    }
  };

  return (
    <section
      id="contact"
      className="pb-20 bg-background text-foreground relative"
    >
      <div className="container max-w-2xl space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary font-instrumentserif">
          <span className="text-purple-500/30">Contact</span> Me
        </h2>
        <p className="text-center text-muted-foreground">
          Let’s collaborate or just say hello! Fill the form below or reach me
          via email.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Input
              type="hidden"
              name="_subject"
              value="New Collaboration Request!"
            />
            <Input type="hidden" name="_captcha" value="false" />
            <Input type="hidden" name="_template" value="box" />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Write your message..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="absolute top-0 md:top-[1%] left-1/2 -translate-x-1/2 opacity-10 font-instrumentserif font-bold text-8xl tracking-wide select-none z-0">
        Contact
      </div>
    </section>
  );
};

export default ContactSectionFeature;
