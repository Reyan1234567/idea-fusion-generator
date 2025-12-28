"use client";
import { useUserStore } from "@/store/bearStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";
import SignoutButton from "./signoutButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { editUser } from "@/lib/profile.action";

const Profile = () => {
  const userName = useUserStore((state) => state.userName);
  const fullName = useUserStore((state) => state.fullName);
  const profilePic = useUserStore((state) => state.profilePic);
  const id = useUserStore((state) => state.id);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  const handleAccountEdit = async () => {
    try {
      await editUser(selectedImage, fullName, userName, id);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong!");
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild className="p-2">
        <Card>
          <CardContent className="flex justify-between items-center px-5">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="">{fullName || "Reyan Berhanu"}</p>
              <p className="text-muted-foreground">{userName || "reyan ber"}</p>
            </div>
          </CardContent>
        </Card>
      </PopoverTrigger>
      <PopoverContent className="w-60 flex flex-col gap-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Account Info
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-row gap-5">
                  <Avatar className="w-30 h-30">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded"
                    />
                  </Avatar>
                  {preview && (
                    <Avatar className="border-3 border-white rounded-sm">
                      <AvatarImage
                        src={preview}
                        alt="@shadcn"
                        className="rounded h-30 w-30 object-cover"
                      />
                    </Avatar>
                  )}
                </div>
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => {
                    console.log(e.target?.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                    setSelectedImage(e.target.files[0]);
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  name="name"
                  defaultValue="Pedro Duarte"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  defaultValue="@peduarte"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleAccountEdit}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <SignoutButton />
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
