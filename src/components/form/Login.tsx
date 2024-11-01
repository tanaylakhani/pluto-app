"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { getActiveWorkspace, login } from "@/lib/actions";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [show, setShow] = React.useState(false);

  const handleLogin = handleSubmit(async (values) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    console.log({ res });
    if (!res?.ok && res?.error) {
      toast.error(res?.error);
      return;
    }
    const activeWorkspace = await getActiveWorkspace();
    toast.success("LoggedIn successfully");
    if (!activeWorkspace) {
      router.push("/workspace");
      return;
    }
    router.push(`/w/${activeWorkspace.id}`);
  });

  return (
    <div className="flex w-full max-w-sm flex-col">
      <div className="mb-4">
        <span className="text-2xl font-semibold tracking-tight">
          Welcome Back
        </span>
      </div>
      <form onSubmit={handleLogin} className="flex w-full  flex-col space-y-2">
        <input
          className="rounded-lg border  border-neutral-300 px-4 py-2  dark:border-lightGray/10"
          {...register("email")}
          placeholder="Email"
        />
        <div className="mt-2 flex items-center justify-center overflow-hidden rounded-lg border border-neutral-300  dark:border-lightGray/10">
          <input
            className="w-full px-4 py-2"
            {...register("password")}
            placeholder="Password"
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
          className="mt-2 rounded-lg bg-[#6a5ed9] px-4 py-2  text-white  hover:bg-[#564ac6]"
        >
          {formState?.isSubmitting && (
            <Loader className="size-4 animate-spin opacity-80" />
          )}
          <span className="font-medium ">Login</span>
        </button>
      </form>
      <div className="my-4 flex w-full items-center justify-center gap-x-2">
        <Separator className="h-[0.9px] w-full bg-neutral-300/60 dark:bg-lightGray/10" />{" "}
        <span className="text-sm opacity-80">or</span>
        <Separator className="h-[0.9px] w-full bg-neutral-300/60 dark:bg-lightGray/10" />
      </div>
      <div className="flex w-full flex-col space-y-2">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={async () => signIn("github")}
        >
          <Image
            src={"/github.svg"}
            className="mr-2 p-1.5"
            width={38}
            height={38}
            alt=""
          />{" "}
          <span className="opacity-80 hover:opacity-100">
            Login with Github
          </span>
        </Button>
        <Button
          variant={"outline"}
          className="w-full "
          onClick={async () => signIn("google")}
        >
          <Image
            src={"/google.svg"}
            className="mr-2 p-1.5"
            width={38}
            height={38}
            alt=""
          />
          <span className="opacity-80 hover:opacity-100">
            Login with Google
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Login;
