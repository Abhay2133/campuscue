"use client";
import { doSignup } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { toast } from "sonner";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "Abhay",
    email: "abhay123@gmail.com",
    password: "abhay123",
  });
  const _doSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { name, email, password } = form;
      const res = await doSignup(name, email, password);
      if (res.status < 400) {
        const data = await res.json();
        localStorage.setItem("jwtToken", data.token);
        toast("Signup successfull");
        router.replace("/");
      } else {
        toast("Failed to Signup");
      }
    } catch (e: unknown) {
      console.error(e);
      toast("Signup Error");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="flex flex-col items-center justify-center px-6 mx-auto h-full lg:py-0 bg-transparent">
        {/* <a href="#" className="text-2xl py-5 font-bold">
          CampusCue
        </a> */}
        <Header />
        <div className="my-5 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create New Account
            </h1>
            <form
              onSubmit={_doSubmit}
              className="space-y-4 md:space-y-6 "
              action="#"
              method="post"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((old) => ({ ...old, name: e.target.value }))
                  }
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="eg. Abhay Negi"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm((old) => ({ ...old, email: e.target.value }))
                  }
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@email.com"
                  required
                />
              </div>

              {/* Passwrod */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={form.password}
                  onChange={(e) =>
                    setForm((old) => ({ ...old, password: e.target.value }))
                  }
                  name="password"
                  id="password"
                  placeholder="password should be greater than 8 letters"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-5 w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                Already have an account ?{" "}
                <a
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Log In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const Header = () => {
  return (
    <header className="flex justify-center p-5">
      <Link href="/">
        <h1 className="text-2xl font-semibold">CampusCue</h1>
      </Link>
    </header>
  );
};
