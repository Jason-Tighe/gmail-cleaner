import GmailMessageCard from "../components/GmailMessageCard";

export default function Inbox() {
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent relative">
        <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
            aria-hidden="true"
        ></div>

        <div className="relative flex flex-col   bg-white bg-opacity-20 rounded-lg shadow-2xl overflow-hidden">
            <div className="w-full bg-orange-400 bg-opacity-90 p-8 overflow-y-auto max-h-[80vh]">
                <GmailMessageCard />
            </div>
        </div>
    </div>
    );
}