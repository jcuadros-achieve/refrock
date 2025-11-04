interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  // Handle both Promise and synchronous object
  const paramsData = searchParams instanceof Promise ? await searchParams : searchParams;
  // Convert searchParams to a flat object for easier handling
  const params = Object.entries(paramsData).reduce(
    (acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value.join(", ") : value || "";
      return acc;
    },
    {} as Record<string, string>
  );

  const hasParams = Object.keys(params).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            ReferralRock POC
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Query Parameters Viewer
          </p>
        </div>

        {!hasParams ? (
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                No parameters in URL
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Add query parameters to the URL to see them here.
              </p>
              <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 text-left inline-block">
                <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200">
                  Example: <span className="text-blue-600 dark:text-blue-400">/?campaign=summer2024&referrer=john&amount=100</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Received Parameters ({Object.keys(params).length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-100 dark:bg-zinc-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-700">
                      Parameter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-700">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {Object.entries(params).map(([key, value], index) => (
                    <tr
                      key={key}
                      className={`hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors ${
                        index % 2 === 0
                          ? "bg-white dark:bg-zinc-800"
                          : "bg-zinc-50 dark:bg-zinc-900/50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50 font-mono">
                          {key}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-zinc-700 dark:text-zinc-300 break-all">
                          {value || <span className="text-zinc-400 italic">(empty)</span>}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                <p className="mb-2">Parameters in URL format:</p>
                <span className="font-mono text-zinc-700 dark:text-zinc-300 break-all block bg-zinc-100 dark:bg-zinc-800 p-2 rounded">
                  {Object.entries(params)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join("&")}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            ℹ️ Information
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            This page is designed to receive and visualize all query parameters
            that ReferralRock sends via query parameters. Simply add the parameters
            to the URL and they will automatically appear in the table.
          </p>
        </div>
      </main>
    </div>
  );
}
