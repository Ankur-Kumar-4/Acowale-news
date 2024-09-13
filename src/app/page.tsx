"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import {
  Search,
  Globe,
  BookOpen,
  Flag,
  Newspaper,
  Calendar,
  User,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  country: string;
  language: string;
  image: string;
  author: string;
  date: string;
}

interface NewsApiResponse {
  articles: Article[];
  totalPages: number;
  currentPage: number;
}

// Mock API function
const fetchNews = async (
  page: number,
  searchTerm: string,
  category: string,
  country: string,
  language: string
): Promise<NewsApiResponse> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockArticles: Article[] = [
    {
      id: 1,
      title: "Breaking News: Global Summit Reaches Climate Agreement",
      content:
        "World leaders have come to a historic agreement on climate change, pledging to reduce carbon emissions by 50% by 2030.",
      category: "Politics",
      country: "Global",
      language: "English",
      image:
        "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=300&h=200&fit=crop",
      author: "Jane Doe",
      date: "2023-06-15",
    },
    {
      id: 2,
      title: "Tech Giants Unveil Revolutionary AI Technology",
      content:
        "Silicon Valley's top companies have jointly announced a breakthrough in artificial intelligence that promises to transform various industries.",
      category: "Technology",
      country: "USA",
      language: "English",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop",
      author: "John Smith",
      date: "2023-06-14",
    },
    {
      id: 3,
      title: "Underdog Team Clinches World Cup in Thrilling Final",
      content:
        "In a stunning turn of events, the underdog national team has won the World Cup, beating the favorites in a nail-biting penalty shootout.",
      category: "Sports",
      country: "Brazil",
      language: "Portuguese",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&h=200&fit=crop",
      author: "Carlos Silva",
      date: "2023-06-13",
    },
    {
      id: 4,
      title: "Global Economy Shows Signs of Recovery Post-Pandemic",
      content:
        "Economic indicators suggest a robust recovery is underway, with growth rates surpassing pre-pandemic levels in several key markets.",
      category: "Economy",
      country: "Germany",
      language: "German",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop",
      author: "Hans Mueller",
      date: "2023-06-12",
    },
    {
      id: 5,
      title: "Blockbuster Movie Breaks All-Time Box Office Records",
      content:
        "The latest installment of a popular franchise has shattered global box office records, grossing over $1 billion in its opening weekend.",
      category: "Entertainment",
      country: "France",
      language: "French",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=200&fit=crop",
      author: "Marie Dubois",
      date: "2023-06-11",
    },
    {
      id: 6,
      title: "Breakthrough in Renewable Energy Storage Announced",
      content:
        "Scientists have developed a new type of battery that could make renewable energy storage more efficient and affordable, potentially accelerating the transition to clean energy.",
      category: "Science",
      country: "Japan",
      language: "Japanese",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop",
      author: "Yuki Tanaka",
      date: "2023-06-10",
    },
  ];

  const filteredArticles = mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "all" || article.category === category) &&
      (country === "all" || article.country === country) &&
      (language === "all" || article.language === language)
  );

  return {
    articles: filteredArticles,
    totalPages: 3, // Mock total pages
    currentPage: page,
  };
};

export default function NewsApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [country, setCountry] = useState("all");
  const [language, setLanguage] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchNews(
        currentPage,
        searchTerm,
        category,
        country,
        language
      );
      setArticles(result.articles);
      setTotalPages(result.totalPages);
      setIsLoading(false);
    };

    fetchData();
  }, [searchTerm, category, country, language, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <motion.header
        className="bg-blue-600 text-white p-6 shadow-lg relative overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        <motion.div
          className="relative z-10 flex items-center justify-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Newspaper className="h-12 w-12 mr-4" />
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            ACONEWS
          </motion.h1>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-blue-300"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
      </motion.header>
      <main className="container mx-auto p-6">
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="relative mb-4">
            <Input
              type="search"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-4 ">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Politics">Politics</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
              </SelectContent>
            </Select>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-[180px]">
                <Flag className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Japan">Japan</SelectItem>
                <SelectItem value="Brazil">Brazil</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
              </SelectContent>
            </Select>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <BookOpen className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : articles.length > 0 ? (
          <AnimatePresence>
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {articles.map((article: Article, index: number) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-blue-600 text-white px-2 py-1 text-sm rounded-br-lg">
                        {article.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-xl font-bold">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-gray-600">
                        {article.content}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </CardFooter>
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            No articles found. Try adjusting your search or filters.
          </div>
        )}
        {articles.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Pagination />
          </div>
        )}
      </main>
    </div>
  );
}
