/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import preview from "@/assets/loginPageImage.png";
import logo from "@/assets/logo.png";
import { useLoginMutation } from "@/redux/api/authApi";
import { Alert, Spin } from "antd";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";


const customIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", email, password);

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await login({ body }).unwrap();
      console.log("login response", response);
      console.log(response?.result?.userInfo?.role);
      if (response.success) {
        toast.success(response.message);
        Cookies.set("token", response?.result?.accessToken);
        Cookies.set("role", response?.result?.userInfo?.role);
        dispatch(setUser(response?.result));
        console.log("login response", response);
        console.log(response?.result?.accessToken);
        console.log(response?.result?.userInfo?.role);
        console.log(response?.result);
        route.push("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      console.log("Execution completed.");
    }
  };

  return (
    <div className="min-h-screen flex ">
      {/* Left Side - Ocean Background */}
      <div className="hidden lg:flex lg:flex-col  lg:w-1/2 relative flex-1 border-r-2 border-gray-300">
        <div className="flex justify-start items-center  px-24 pt-16 gap-4">
          {/* Logo and Brand */}
          <div className="">
            <Image
              src={logo}
              height={100}
              width={100}
              alt="Logo"
              className="w-12 h-12 object-cover object-center"
              priority
            />
          </div>
          <div>
            <p className="lg:text-5xl text-2xl font-bold bg-gradient-to-r from-[#11E8DB] to-[#D08087] bg-clip-text text-transparent py-6">
              FateForge
            </p>
          </div>
        </div>

        {/* Preview Image Section - Fixed */}
        <div className="flex-1 relative w-full h-[800px]  pt-16 ">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain rounded-lg "
            priority
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 mx-auto  flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl  mx-auto">
          <div className="flex-grow"></div>

          {/* Login Form */}
          <div className="lg:space-y-10 space-y-6 lg:my-20 my-4 lg:px-0 px-4">
            <div className="text-start">
              <h2 className="text-3xl font-bold text-[#1C2634]">Login</h2>
              <p className="lg:mt-5 mt-2 text-[#6C7278] font-medium">
                {"Let's login into your account first"}
              </p>
            </div>

            <form onSubmit={handleLogin} className="lg:space-y-10 space-y-6">
              {/* Email Field */}
              <div className="relative">
                <div className="relative border border-[#DCE4E8] rounded-full focus-within:border-[#08E9DB] transition-colors bg-white">
                  <label
                    htmlFor="email"
                    className="absolute -top-2.5 left-4 px-2 bg-white text-sm text-black font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 text-base text-[#1C2634] bg-transparent rounded-full border-none outline-none focus:ring-0 placeholder:text-gray-400"
                    /* style={{
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                     
                    }} */
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="relative border border-[#DCE4E8] rounded-full focus-within:border-[#08E9DB] transition-colors bg-white">
                  <label
                    htmlFor="password"
                    className="absolute -top-2.5 left-4 px-2 bg-white text-sm text-black font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-4 pr-14 text-base text-[#1C2634] bg-transparent rounded-full border-none outline-none focus:ring-0 placeholder:text-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert
                  message={
                    (error as any)?.data?.message ||
                    (typeof error === "object" && "message" in error
                      ? (error as any).message
                      : "An error occurred")
                  }
                  type="error"
                  showIcon
                />
              )}

             
              <Button
                type="submit"
                className="w-full h-12 text-lg bg-[#08E9DB] hover:bg-[#08e9daaf] text-black font-bold rounded-full transition-colors mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Logging in <Spin indicator={customIcon} />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              
            </form>
          </div>

          <div className="flex-grow"></div>

          {/* Footer */}
          <div className="flex flex-wrap text-xs px-6 xl:px-0 pb-6 xl:mt-8">
            <p className="text-[#6C7278] font-medium text-lg">
              © 2025 HEAR FUTURE FIRST. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}