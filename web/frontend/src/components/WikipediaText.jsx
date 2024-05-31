import React, { useState, useEffect } from "react";
import axios from "axios";

const WikipediaText = ({ articleTitle }) => {
  const [paragraph, setParagraph] = useState("");
  const [error, setError] = useState(null);
  const sentenceLimit = 3;

  useEffect(() => {
    const fetchLastParagraph = async () => {
      try {
        const response = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            format: "json",
            prop: "extracts",
            titles: articleTitle,
            exintro: true,
            explaintext: true,
            origin: "*",
          },
        });

        const pages = response.data.query.pages;
        const page = Object.values(pages)[0];
        const extract = page.extract;

        if (extract) {
          const paragraphs = extract
            .split("\n")
            .filter((paragraph) => paragraph.trim() !== "");
          const lastParagraph = paragraphs[paragraphs.length - 1];

          // Limit the number of sentences
          const sentences = lastParagraph
            .split(". ")
            .filter((sentence) => sentence.trim() !== "");
          const limitedSentences =
            sentences.slice(0, sentenceLimit).join(". ") +
            (sentences.length > sentenceLimit ? "." : "");

          setParagraph(limitedSentences);
        } else {
          setError("No content found for this article.");
        }
      } catch (err) {
        setError("Failed to fetch data from Wikipedia.");
      }
    };

    fetchLastParagraph();
  }, [articleTitle, sentenceLimit]);

  return <div>{error ? <p>{error}</p> : <p>{paragraph}</p>}</div>;
};

export default WikipediaText;
