
import { createClient } from "@/prismicio";
export default async function Noticia() {
    const prismicClient = createClient();
	const posts = await prismicClient.getAllByType("ebcalcnoticia").catch(e => {
		console.error(e);
		return [];
	});

    return (
        <title>EBCalc - Sobre nós</title>
        // <div className="max-w-2xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6"></div>
    )
}