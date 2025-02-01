import FooterComponent from "@/components/footerComponent";
import HeaderComponent from "@/components/headerComponent";

export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="flex space-x-10 mb-8">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
            alt="Next.js Logo"
            link="https://nextjs.org" 
            className="w-24 h-24 transition-transform transform hover:scale-110"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg"
            alt="Laravel Logo"
            link="https://laravel.com"
            className="w-24 h-24 transition-transform transform hover:scale-110"
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Next.js + Laravel</h1>
        <p className="text-lg text-gray-600 text-center">Connect Next.js with Laravel API</p>
      </div>
      <FooterComponent />
    </div>
  );
}