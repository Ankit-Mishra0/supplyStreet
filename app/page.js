import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-red-500">Welcome to  My App</h1>
      <Link href="/login"> <button>login</button></Link>
       <Link href="/dashboard"> <button>dashboard</button></Link>
     
    </div>
  );
}

