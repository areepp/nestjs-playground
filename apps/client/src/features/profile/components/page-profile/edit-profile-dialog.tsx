import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditProfilePictureDialog } from "./edit-profile-picture-dialog";
import { SchemaEditProfile, schemaEditProfile } from "../../api/edit-profile";
import { useGetMyProfile } from "../../api/get-my-profile";

export function EditProfileDialog() {
  const form = useForm<SchemaEditProfile>({
    resolver: zodResolver(schemaEditProfile),
  });

  const { data } = useGetMyProfile({});

  useEffect(() => {
    form.reset({ name: data?.name, profilePicture: null });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function onSubmit(data: SchemaEditProfile) {
    console.log("halo", data);
    console.log(form.getValues());
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3">
          <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <EditProfilePictureDialog />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
