import GoogleSignInButton from '../components/LoginModal';


export default function Login() {
    return (
        <>
               <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
                <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
                {/* Left Side: Info */}
                <div className="hidden md:flex flex-col justify-center bg-amber-600 text-white p-10 w-1/2">
                    <h2 className="text-4xl font-bold mb-6">Welcome to Gmail Cleaner</h2>
                    <p className="text-lg mb-6">
                    Declutter your inbox and stay organized. Say goodbye to email overload and hello to peace of mind.
                    </p>
                    <ul className="list-disc list-inside space-y-3 text-base">
                    <li>Bulk delete unnecessary emails</li>
                    <li>Unsubscribe from spam and newsletters</li>
                    <li>Filter by date, sender, or keyword</li>
                    <li>Improve productivity with fewer distractions</li>
                    </ul>
                </div>

                {/* Right Side: Sign In */}
                <div className="flex flex-col justify-center items-center p-10 w-full md:w-1/2 bg-zinc-800">
                    <h1 className="text-3xl font-bold text-amber-400 mb-4">Sign In</h1>
                    <p className="text-amber-300 mb-6 text-center">
                    Log in to clean up your inbox effortlessly.
                    </p>
                    <GoogleSignInButton />
                </div>
                </div>
            </div>
        </>
    );
}