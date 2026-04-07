import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic"; // SSR

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post não encontrado",
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 100),
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <p className="text-gray-500 mb-6">
        Por {post.author} • {post.createdAt}
      </p>

      <article className="prose">
        {post.content}
      </article>
    </main>
  );
}