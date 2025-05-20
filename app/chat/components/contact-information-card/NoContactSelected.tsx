import { Users } from "lucide-react"

export const NoContactSelected = () => {
    return (
        <div className="p-4 flex flex-col items-center justify-center h-full text-center">
            <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center mb-4 animate-pulse">
                <Users className="h-10 w-10 text-muted-foreground animate-bounce" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No contact selected</h3>
            <p className="text-sm text-muted-foreground max-w-[200px]">
                Choose a contact from the list to view their information and start a conversation
            </p>
        </div>
    )
}
