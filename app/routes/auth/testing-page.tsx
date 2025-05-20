import { Form, NavLink, useNavigation } from "react-router";
import type { Route } from "./+types/testing-page";
import { sleep } from "~/lib/sleep";

export async function action({ request }: Route.ActionArgs) {
    await sleep(1000);
    const data = await request.formData();
    const name = data.get("name");
    // const age = data.get("age");
    const allData = Object.fromEntries(data);
    // title: data.get("title"),
    console.log('Server Side - Action');

    console.log({ name, allData });

    return { ok: true, message: 'Todo bien desde el serverAction' };
}

export async function clientAction({ serverAction, request }: Route.ClientActionArgs) {
    await sleep(1000);
    // can still call the server action if needed
    const formData = await request.clone().formData();
    // const age = data.get("age");
    const allData = Object.fromEntries(formData);
    const data = await serverAction();
    // return data;
    return { message: 'Hola Mundo desde el clientAction - Client', data, allData };
}

export async function loader() {
    console.log('Hello, world! desde el loader - Server');
    return { message: 'Hello, world! desde el loader - Server' };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
    console.log('Hola Mundo desde el clientLoader - Client');
    // call the server loader
    const serverData = await serverLoader();

    return {
        message: 'Hola Mundo desde el clientLoader - Client',
        serverData: serverData,
    };
}

// clientAction.hydrate = true as const;


export default function TestingPage({
    loaderData,
    actionData,
    params,
    matches,
}: Route.ComponentProps) {
    const navigation = useNavigation();
    const isPosting = navigation.state === 'submitting';
    // console.log({ navigation, isPosting });

    return (
        <>
            <div>
                <h1 className="font-bold text-2xl">Testing Page</h1>
                <p>Loader Data: {JSON.stringify(loaderData)}</p>
                <p>Action Data: {JSON.stringify(actionData)}</p>
                <p>Route Parameters: {JSON.stringify(params)}</p>
                <p>Matched Routes: {JSON.stringify(matches)}</p>
                <NavLink to="/auth/testing-args/ABC-123/Juan/25" className={
                    ({ isPending }) =>
                        isPending ? 'text-red-500 underline text-2xl' : 'text-blue-500 underline text-2xl'
                }>
                    Testing Args
                </NavLink>
                {/* action="/auth/testing" */}
                <Form className="mt-2 flex gap-2" method="post">
                    <input type="text" name="name" className="border-2 border-gray-300 rounded-md p-2" />
                    <input type="text" name="age" className="border-2 border-gray-300 rounded-md p-2" />
                    <button type="submit"
                        disabled={isPosting}
                        className="bg-blue-500 text-white rounded-md p-2 disabled:opacity-50"
                    >
                        {isPosting ? 'Submitting...' : 'Submit'}
                    </button>
                </Form>
            </div>
        </>
    );
}
