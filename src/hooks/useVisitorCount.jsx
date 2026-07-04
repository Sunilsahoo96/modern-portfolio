import { useState, useEffect } from "react";

function useVisitorCount() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        // Unique namespace for the project to separate counts
        const namespace = "sunilsahoo-portfolio";
        const key = "visits";

        // Check if we are running in localhost or dev server
        const isLocalhost =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        const hasVisited = sessionStorage.getItem("portfolio_visited");

        // If localhost or already visited this session, only retrieve count.
        // If production and first time this session, increment count using /up.
        const endpoint = (isLocalhost || hasVisited)
          ? `https://api.counterapi.dev/v1/${namespace}/${key}/`
          : `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setCount(data.count);
          setLoading(false);

          // Mark as visited for this session if not local
          if (!isLocalhost && !hasVisited) {
            sessionStorage.setItem("portfolio_visited", "true");
          }
        }
      } catch (err) {
        console.error("Error fetching visitor count:", err);
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return { count, loading, error };
}

export default useVisitorCount;
