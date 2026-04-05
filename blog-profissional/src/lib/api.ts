const API_URL =
  "https://crudcrud.com/api/d71e15d7d538479c8e8b299d62348202/posts";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  createdAt: string;
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Erro na API: Provavelmente o endpoint expirou.");
    return []; // Retorna um array vazio em vez de quebrar o site
  }

  return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();

  return posts.find((post) => post.slug === slug);
}
