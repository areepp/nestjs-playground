"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schemaLogin, SchemaLogin, useLogin } from "../api/login";

export default function LoginPage() {
  const form = useForm<SchemaLogin>({
    resolver: zodResolver(schemaLogin),
  });

  const { mutate } = useLogin({});

  function onSubmit(values: SchemaLogin) {
    mutate(values);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in to your account</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button className="cursor-not-allowed" variant="outline">
              Facebook
            </Button>
            <Button className="cursor-not-allowed" variant="outline">
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="m@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
            Log in
          </Button>
          <p className="self-end text-xs">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
