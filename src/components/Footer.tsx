'use client'

// components/Header.tsx
export default function Footer() {
  return (
    <div className=" bg-black ">
      <footer className="flex flex-col  bg-black py-20 justify-center gap-2 items-center px-6  sadow-sm  max-w-[82.5rem] mx-auto">
        <h1 className="text-3xl font-semibold text-white">
          Ready to Elevate Your Style?
        </h1>
        <p className=" text-white px-4 rounded-full text-lg">
          © {new Date().getFullYear()} Classic Premium. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}
