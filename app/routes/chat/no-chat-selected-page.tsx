import { MessageCircle } from "lucide-react";

const NoChatSelectedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="h-24 w-24 rounded-full bg-muted/20 flex items-center animate-bounce">
                <MessageCircle className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-gray-600">
                No chat selected
            </h2>
            <p className="text-gray-500">
                Select a chat to start a conversation
            </p>
        </div>
    )
}

export default NoChatSelectedPage;
