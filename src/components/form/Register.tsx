"use client";
import { RegisterSchema, register as signUp } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

const Register = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [show, setShow] = React.useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col">
      <div className="mb-4">
        <span className="text-2xl font-semibold tracking-tight">
          Register Now
        </span>
      </div>
      <div className="flex w-full flex-col space-y-2">
        <Button
          className="w-full"
          variant={"outline"}
          // onClick={async () => signIn("github", { callbackUrl: "/workspace" })}
        >
          <Image
            src={"/github.svg"}
            className="mr-2 p-1.5"
            width={38}
            height={38}
            alt=""
          />{" "}
          <span className="opacity-80 hover:opacity-100">
            Signup with Github
          </span>
        </Button>
        <Button
          variant={"outline"}
          className="mt-2 w-full"
          // onClick={async () => signIn("google", { callbackUrl: "/workspace" })}
        >
          <Image
            src={"/google.svg"}
            className="mr-2 p-1.5"
            width={38}
            height={38}
            alt=""
          />
          <span className="opacity-80 hover:opacity-100">
            Signup with Google
          </span>
        </Button>
      </div>
      <div className="my-4 flex w-full items-center justify-center gap-x-2">
        <Separator className="h-[0.9px] w-full bg-neutral-300/60 dark:bg-lightGray/10" />{" "}
        <span className="text-sm opacity-80">or</span>
        <Separator className="h-[0.9px] w-full bg-neutral-300/60 dark:bg-lightGray/10" />
      </div>
      <form
        onSubmit={handleSubmit(async (data) => {
          const { data: res, error } = await signUp(data);
          console.log({ res, error });
          if (error) {
            toast.error(error);
            return;
          }
          router.push("/login");
        })}
        className="flex w-full  flex-col "
      >
        <label htmlFor="name" className="mt-1 px-1 opacity-80">
          Name
        </label>
        <input
          required
          maxLength={50}
          id="name"
          {...register("name")}
          className="rounded-lg border  border-neutral-300 px-4 py-2  dark:border-lightGray/10 mt-1"
        />
        <label htmlFor="email" className="mt-2 px-1 opacity-80">
          Email
        </label>
        <input
          type="email"
          autoComplete="email"
          required
          maxLength={50}
          placeholder="Enter your email"
          {...register("email")}
          className="rounded-lg border placeholder:text-sm placeholder:font-light border-neutral-300 px-4 py-2  dark:border-lightGray/10 mt-1"
        />

        <label htmlFor="password" className="mt-2 px-1 opacity-80">
          Password
        </label>

        <div className=" flex items-center mt-1 justify-center overflow-hidden rounded-lg border border-neutral-300  dark:border-lightGray/10">
          <input
            className="w-full px-4 py-2 "
            id="password"
            required
            {...register("password")}
            type={show ? "text" : "password"}
          />
          <div className="bg-transparent p-2" onClick={() => setShow(!show)}>
            {show ? (
              <EyeOffIcon
                strokeWidth={1.6}
                className=" h-6 w-6 cursor-pointer opacity-80"
              />
            ) : (
              <EyeIcon
                strokeWidth={1.6}
                className=" h-6 w-6 cursor-pointer opacity-80"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2  text-white  hover:bg-indigo-700"
        >
          {isLoading && <Loader className="size-4 animate-spin opacity-80" />}
          <span className="font-medium tracking-tight">Signup</span>
        </button>
      </form>
    </div>
  );
};

export default Register;
