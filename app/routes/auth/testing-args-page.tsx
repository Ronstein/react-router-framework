import { Link } from "react-router";
import type { Route } from "./+types/testing-args-page";
import { sleep } from "~/lib/sleep";

export function meta() {
    return [
        { title: "SupportChat app" },
        {
            property: "og:title",
            content: "SupportChat app",
        },
        {
            name: "description",
            content: "This SupportChat app is the best",
        },
    ];
}

export function headers() {
    return {
        "X-Stretchy-Pants": "its for fun",
        "Cache-Control": "max-age=300, s-maxage=3600",
    };
}

export function links() {
    return [
        // {
        //     rel: "icon",
        //     href: "/favicon.png",
        //     type: "image/png",
        // },
        // {
        //     rel: "stylesheet",
        //     href: "https://example.com/some/styles.css",
        // },
        // {
        //     rel: "preload",
        //     href: "/images/banner.jpg",
        //     as: "image",
        // },
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    console.log({ params });
    return { hola: 'mundo' };
}


export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    // console.log({ params });

    await sleep(1500);
    return { hola: 'mundo' };
}

export function HydrateFallback() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-lg font-medium text-muted-foreground">Cargando...</p>
            </div>
        </div>
    );
}

clientLoader.hydrate = true as const;

export default function TestingArgsPage({
    loaderData,
    actionData,
    params,
    matches,
}: Route.ComponentProps) {
    const { id, name, age } = params;
    console.log({ id, name, age });
    console.log('Componente Creado');

    return (
        <div>
            <h1 className="font-bold text-2xl">Testing Args Page</h1>
            <h1 className="font-bold text-4xl">Name: {name}</h1>
            <h1 className="font-bold text-3xl">Age: {age}</h1>
            <h1 className="font-bold text-2xl">ID: {id}</h1>

            <p>Loader Data: {JSON.stringify(loaderData)}</p>
            <p>Action Data: {JSON.stringify(actionData)}</p>
            <p>Route Parameters: {JSON.stringify(params)}</p>
            <p>Matched Routes: {JSON.stringify(matches)}</p>
            <Link to="/auth/testing" className="text-blue-500 underline text-2xl">
                Testing
            </Link>
        </div>
    );
}
