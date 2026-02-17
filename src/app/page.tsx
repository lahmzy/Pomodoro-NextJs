import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col items-center text-center gap-8 max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight">
          Welcome to Sentinel Pomodoro
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400">
          Please login or register to use this app
        </p>

        <div className="flex gap-4 mt-4">
          <Link
            href="/login"
            className="rounded-lg border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 transition-colors flex items-center justify-center font-medium text-base h-12 px-8"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg border-2 border-green-600 bg-green-600 text-white hover:bg-green-700 hover:border-green-700 transition-colors flex items-center justify-center font-medium text-base h-12 px-8"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
