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
  try {
    const res = await fetch(API_URL, {
      cache: "no-store", // SSR
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar posts");
    }

    return res.json();
  } catch (error) {
    console.error("API falhou:", error);

    // 🔥 fallback para testes (IMPORTANTE)
    return [
      {
        _id: "1",
        title: "A Cronologia da Água",
        content:
          "O filme A Cronologia da Água acompanha, como uma adaptação, a autobiografia de Lidia Yuknavitch. Atualmente como escritora, ela já foi uma aspirante a nadadora olímpica, e essa oportunidade a fez se libertar de um ambiente repleto de violência e abusos. Fadado ao fracasso, Lidia Yuknavitch conseguiu superar traumas através da arte da escrita. Hoje, ela tenta encorajar meninas a retomarem suas próprias histórias sangrentas, para que assim, suas vozes sejam ouvidas....",
        author: "José Roberto",
        slug: "a-cronologia-da-água",
        createdAt: "2026-04-07",
      },
    ];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
