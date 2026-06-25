import { useEffect, useState } from "react";
import api from "../services/api";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get("/articles")
      .then(res => setArticles(res.data.articles))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Articles</h1>

      {articles.map(article => (
        <div key={article.url}>
          <h3>{article.title}</h3>
          <p>{article.source}</p>
          <p>Score: {article.relevanceScore}</p>
          <p>Impact: {article.impact}</p>
        </div>
      ))}
    </div>
  );
}

export default Articles;
