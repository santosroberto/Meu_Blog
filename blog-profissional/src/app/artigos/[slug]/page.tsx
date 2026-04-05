import { getPostBySlug, getPosts } from "@/lib/api";
import { notFound } from "next/navigation";

interface Post {
  slug: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();

  if (!Array.isArray(posts)) return [];

  return posts
    .filter((post) => post.slug) 
    .map((post) => ({
      slug: String(post.slug),
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.content.substring(0, 100),
  };
}

export const dynamic = "force-static";

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        Por {post.author} • {post.createdAt}
      </p>
      {post.content}
    </main>
  );
}
