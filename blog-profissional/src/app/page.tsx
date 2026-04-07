import Link from "next/link";
import { getPosts, Post } from "@/lib/api";

export const dynamic = "force-dynamic"; // SSR

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Meu Blog</h1>

      {posts.length === 0 && (
        <p className="text-red-500">
          Nenhum post encontrado (API pode ter expirado)
        </p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>

            <p className="text-gray-500 text-sm">
              Por {post.author} • {post.createdAt}
            </p>

            <Link
              href={`/artigos/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              Ler mais →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}