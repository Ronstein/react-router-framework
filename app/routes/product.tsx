import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
    const { name } = params;
    return {
        name: name.toUpperCase(),
    }
}

const ProductPage = ({ loaderData }: Route.ComponentProps) => {
    const { name } = loaderData;
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Detalles del Producto
                </h1>
                <div className="border-t border-gray-200 pt-4">
                    <p className="text-xl text-gray-600">
                        Nombre del producto: <span className="font-semibold text-blue-600">{name}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
