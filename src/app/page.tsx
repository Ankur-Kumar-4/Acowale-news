"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
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
import {
  Search,
  Globe,
  BookOpen,
  Flag,
  Newspaper,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { fetchNews } from "@/services/newsService";

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

// interface NewsApiResponse {
//   articles: Article[];
//   totalPages: number;
//   currentPage: number;
// }

// Mock API function

export default function NewsApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [country, setCountry] = useState("all");
  const [language, setLanguage] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  console.log(totalPages);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log({ searchTerm, category, country, language, currentPage }); // Log state values
      try {
        const result = await fetchNews(
          currentPage,
          searchTerm,
          category,
          country,
          language
        );
        setArticles(result.articles);
        setTotalPages(result.totalPages);
      } catch (error: any) {
        console.error(error.message);
      }
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
          <div className="flex flex-wrap gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="science">Science</SelectItem>
              </SelectContent>
            </Select>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-[180px]">
                <Flag className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="cn">China</SelectItem>
                <SelectItem value="eg">Egypt</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="gr">Greece</SelectItem>
                <SelectItem value="hk">Hong Kong</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="ie">Ireland</SelectItem>
                <SelectItem value="il">Israel</SelectItem>
                <SelectItem value="it">Italy</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="nl">Netherlands</SelectItem>
                <SelectItem value="no">Norway</SelectItem>
                <SelectItem value="pk">Pakistan</SelectItem>
                <SelectItem value="pe">Peru</SelectItem>
                <SelectItem value="ph">Philippines</SelectItem>
                <SelectItem value="pt">Portugal</SelectItem>
                <SelectItem value="ro">Romania</SelectItem>
                <SelectItem value="ru">Russian Federation</SelectItem>
                <SelectItem value="sg">Singapore</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
                <SelectItem value="se">Sweden</SelectItem>
                <SelectItem value="ch">Switzerland</SelectItem>
                <SelectItem value="tw">Taiwan</SelectItem>
                <SelectItem value="ua">Ukraine</SelectItem>
                <SelectItem value="gb">United Kingdom</SelectItem>
                <SelectItem value="us">United States</SelectItem>
              </SelectContent>
            </Select>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <BookOpen className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="nl">Dutch</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="el">Greek</SelectItem>
                <SelectItem value="he">Hebrew</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ml">Malayalam</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
                <SelectItem value="no">Norwegian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ro">Romanian</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="sv">Swedish</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="uk">Ukrainian</SelectItem>
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
                  key={index}
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
                        {article.source.name}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-xl font-bold">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-gray-600">
                        {article.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        Read More
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
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
        {/* {articles.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )} */}
      </main>
    </div>
  );
}
