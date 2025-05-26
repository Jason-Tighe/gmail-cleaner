
export default function Login() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-transparent relative">
                <div
                    className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-md"
                    aria-hidden="true"
                ></div>
                <div className="relative flex flex-col md:flex-row w-11/12 max-w-4xl bg-white bg-opacity-20 rounded-lg shadow-2xl overflow-hidden">
                    {/* Left Section: Login */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Sign In</h1>
                        <p className="text-white mb-6 text-center">Log in to clean up your inbox effortlessly.</p>
                        <button
                            className="flex items-center justify-center w-full py-2 px-4 bg-red-800 text-white font-medium rounded-md hover:bg-red-600"
                        >
                            Connect with Google
                        </button>
                    </div>
                    {/* Right Section: Introduction */}
                    <div className="w-full md:w-3/5 bg-red-800 text-white p-10 flex flex-col justify-center">
                        <h2 className="text-4xl font-bold mb-6">Welcome to Gmail Cleaner</h2>
                        <p className="text-lg mb-8">
                            Our app helps you declutter your inbox and stay organized. Say goodbye to email
                            overload and hello to a cleaner, more productive inbox.
                        </p>
                        <ul className="list-disc list-inside space-y-3 text-base">
                            <li>Bulk delete emails to free up space</li>
                            <li>Automatically sort and archive emails</li>
                            <li>Unsubscribe from unwanted newsletters</li>
                            <li>Focus on what matters most</li>
                            <li>Save time with smart email management</li>
                            <li>Improve productivity with a clutter-free inbox</li>
                            <li>Stay organized with advanced filtering options</li>
                        </ul>
                        <p className="text-base mt-8 text-center">
                            Join thousands of users who have transformed their email experience. Start your journey
                            to a cleaner inbox today!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}