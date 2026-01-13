import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🌤️</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Şəhər tapılmadı
        </h1>
        <p className="text-gray-600 mb-6">
          Axtardığınız şəhər üçün hava məlumatı mövcud deyil. Zəhmət olmasa
          mövcud şəhərlərdən birini seçin.
        </p>
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Ana səhifəyə qayıt
          </Link>
          <Link
            href="/weekly"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Həftəlik hava proqnozu
          </Link>
        </div>
      </div>
    </div>
  );
}
