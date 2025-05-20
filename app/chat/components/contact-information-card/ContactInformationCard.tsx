import { useLoaderData, useNavigation, useParams } from "react-router"
import { ContactInformation } from "./ContactInformation"
import { ContactInformationSkeleton } from "./ContactInformationSkeleton"
import { NoContactSelected } from "./NoContactSelected"
import type { Client } from "~/chat/interfaces/chat.interface"


export const ContactInformationCard = () => {
    const { id } = useParams();
    const { clients = [], client } = useLoaderData();

    // console.log('client:', client);

    const { state } = useNavigation();

    const isPending = state === 'loading';

    // console.log({ id, clients, isPending });
    // console.log({ isPending, state });

    if (isPending) return <ContactInformationSkeleton />;

    if (client) return <ContactInformation client={client} />


    if (!id) return <NoContactSelected />;

    if (!client) return <NoContactSelected />;
    // const client = clients.find((client: Client) => client.id === id);


    return <ContactInformation client={client} />
}
