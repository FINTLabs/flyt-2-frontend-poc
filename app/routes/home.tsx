import type { Route } from './+types/home';
import { Welcome } from '~/components/welcome';
const baseUrl = import.meta.env.BASE_URL;

export async function clientLoader() {
    return baseUrl;
}

export default function Home({ loaderData }: Route.ComponentProps) {
    console.log(loaderData);
    return <Welcome />;
}
