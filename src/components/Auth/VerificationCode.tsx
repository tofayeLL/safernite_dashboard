/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import preview from "@/assets/loginPageImage.png";
import logo from "@/assets/saferniteLogo (2).png";
import { Input } from "../ui/input";




export default function VerificationCode() {

  const [code, setCode] = useState(["7", "4", "", ""])
  const [timer, setTimer] = useState(43) // initial countdown for re-send
  // Add logic for input focus, code update, timer countdown, etc.

  
  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const nextCode = [...code]
      nextCode[index] = value
      setCode(nextCode)
      // auto focus next input if filling forward
      if (value && index < 3) {
        const next = document.getElementById(`code-${index + 1}`)
        next?.focus()
      }
    }
  }
  //   const handleGoogleLogin = () => {
  //     console.log("Google login attempt");
  //   };

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
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        <div className="">
      <div className="bg-white   p-8 w-full ">
        <h2 className="text-4xl font-semibold ">Verification Code</h2>
        <p className="text-gray-500  text-lg mt-3">
          Enter the verification code that we have sent to your phone number
        </p>
        <div className="flex justify-between items-center  space-x-3 w-[310px] mx-auto mt-10">
          {[0, 1, 2, 3].map((idx) => (
            <Input
              key={idx}
              id={`code-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 text-center text-xl border  shadow border-gray-200 rounded-md focus:ring-2 focus:ring-[#08E9DB]"
              value={code[idx]}
              onChange={e => handleChange(idx, e.target.value)}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <Button className="w-full bg-[#08E9DB] hover:bg-[#08E9DB] text-base text-black font-semibold py-3 mt-8 rounded-lg shadow disabled:opacity-60">
          Continue
        </Button>
        <div className="text-center text-gray-500 text-xs mt-6 ">
          Re-send code in <span className="text-[#08E9DB]">{`0:${timer < 10 ? "0" : ""}${timer}`}</span>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
