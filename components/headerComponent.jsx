import Link from "next/link";

export default function HeaderComponent() {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800"> {process.env.NEXT_NAME_APLICATION}</h1>
        <nav className="flex space-x-6">
          <Link href={'/'} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Home
          </Link>
          <Link href={'/register'} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Register
          </Link>
          <Link href={'/login'} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Login
          </Link>
        </nav>
      </div>
    </div>
  );
}