import GoogleSignInButton from '../components/LoginModal';

export default function Login() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
                <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
                    <div className="hidden md:flex flex-col justify-center items-center bg-green-100  p-10 w-1/2 text-center">
                        <h2 className="text-4xl font-bold mb-6">Welcome to Gmail Cleaner</h2>
                        <p className="text-lg mb-6">
                            De-Clutter your inbox and stay organized. Say goodbye to email overload and hello to peace of mind.
                        </p>
                        <ul className="list-disc list-inside space-y-3 text-base text-left">
                            <li>Bulk delete unnecessary emails</li>
                            <li>Filter emails by sender, date, and labels</li>
                            <li>Effortlessly manage your inbox</li>
                            <li>Simple and intuitive interface</li>
                            <li>Secure and privacy-focused</li>
                            <li>Free to use with no hidden costs</li>
                            <li>Sign in with Google for easy access</li>
                        </ul>
                    </div>

                    <div className="flex flex-col justify-center items-center p-10 w-full md:w-1/2 bg-zinc-600 text-center">
                        <h1 className="text-3xl font-bold text-green-100 mb-4">Sign In</h1>
                        <p className="text-green-100 mb-6">
                            Log in to clean up your inbox effortlessly.
                        </p>
                        <GoogleSignInButton />
                    </div>
                </div>
            </div>
        </>
    );
}
