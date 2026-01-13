export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="h-4 w-24 bg-blue-400 rounded mb-3 animate-pulse"></div>
          <div className="h-8 w-64 bg-blue-400 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-48 bg-blue-400 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Search Section Skeleton */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-pulse">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-full sm:w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Forecast Cards Skeleton */}
      <div className="max-w-6xl mx-auto px-4 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 animate-pulse"
            >
              {/* Date Header Skeleton */}
              <div className="border-b border-gray-200 pb-3 mb-4">
                <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>

              {/* Weather Icon and Description Skeleton */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
                  <div className="flex items-baseline gap-2">
                    <div className="h-10 w-16 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                </div>
              </div>

              {/* Weather Details Skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Skeleton */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 animate-pulse">
          <div className="h-6 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Other Cities Skeleton */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="h-5 w-36 bg-gray-200 rounded"></div>
            <div className="h-10 w-full sm:w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
