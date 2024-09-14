import axios from "axios";

// Ensure BASE_URL is always a string
const BASE_URL = (process.env.BASE_URL as string) || "http://localhost:5000"; // Fallback URL

interface Source {
  name: string;
  url: string;
}

export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: Source;
}

export interface NewsApiResponse {
  articles: Article[];
  totalPages: number;
  currentPage: number;
}

export const fetchNews = async (
  page: number = 1,
  searchTerm: string = "",
  category: string = "all",
  country: string = "all",
  language: string = "all"
): Promise<NewsApiResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: {
        q: searchTerm || "news",
        country: country,
        category: category,
        lang: language,
        page: page,
        max: 10,
      },
    });

    return {
      articles: response.data.articles,
      totalPages: Math.ceil(response.data.totalArticles / 10),
      currentPage: page,
    };
  } catch (error: any) {
    console.error(
      "Error fetching data from local server:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error fetching news");
  }
};
