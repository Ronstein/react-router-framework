import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Copy, Download, ThumbsUp, ThumbsDown, Send, MessageSquare } from "lucide-react"
import { getClientMessages, sendMessage } from "~/fake/fake-data"
import type { Route } from "./+types/client-chat-page"
import { formatDate } from "~/lib/date-formatter"
import { Form } from "react-router"

// import type { ShouldRevalidateFunctionArgs } from "react-router";

// export function shouldRevalidate(
//     arg: ShouldRevalidateFunctionArgs
// ) {
//     return false;
// }


export async function loader({ params }: Route.LoaderArgs) {
    //     console.log('ChatLayout loader called');
    //     return { messsage: 'Hello World' };
    // console.log({ clients });

    const { id } = params;

    const messages = await getClientMessages(id);

    return { messages };
}

export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData();
    const message = `${formData.get('message')}`;

    // console.log({ message });
    const newMessage = await sendMessage({
        sender: 'agent',
        clientId: params.id,
        content: message,
        createdAt: new Date(),
    });

}


export default function ClientChatPage({ loaderData }: Route.ComponentProps) {
    const [input, setInput] = useState("")
    const { messages = [] } = loaderData;
    return (
        <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {
                        messages.length === 0 && (
                            <div className="flex items-center justify-center h-full mt-4">
                                <div className="text-center space-y-4">
                                    <div className="animate-bounce">
                                        <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">No hay mensajes aún</h2>
                                        <p className="text-muted-foreground">Envía un mensaje para iniciar la conversación</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {messages.map((message, index) => (
                        <div key={index} className="w-full">
                            {message.sender === "client" ? (
                                // Agent message - left aligned
                                <div className="flex gap-2 max-w-[80%]">
                                    <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">NexTalk</span>
                                            <span className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</span>
                                        </div>
                                        <div className="p-3 bg-muted/50 rounded-lg">
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <ThumbsUp className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <ThumbsDown className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // User message - right aligned
                                <div className="flex flex-col items-end">
                                    <div className="text-right mb-1">
                                        <span className="text-sm font-medium mr-2">G5</span>
                                        <span className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</span>
                                    </div>
                                    <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <Form method="post" className="flex items-center gap-2">
                    <Textarea
                        placeholder="Type a message as a customer"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        name="message"
                        className="min-h-[44px] h-[44px] resize-none py-3"
                    />
                    <Button
                        type="submit"
                        className="h-[44px] px-4 flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>Send</span>
                    </Button>
                </Form>
            </div>
        </div>
    )
}

