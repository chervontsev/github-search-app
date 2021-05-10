import axios from 'axios';
import { useEffect, useState } from 'react';
import { githubApiSearchRepos } from '../api/github';

export default function useRepoSearch(query, page) {
  const [repos, setRepos] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setRepos([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;

    const params = { q: query, page };
    const cancelCallback = (c) => (cancel = c);

    const apiSearchSuccess = ({ data }) => {
      setRepos((prevRepos) => [...new Set([...prevRepos, ...data.items])]);
      setHasMore(data.items > 0);
      setLoading(false);
    };

    const apiSearchError = (e) => {
      if (axios.isCancel(e)) {
        return;
      }
      setError(true);
    };

    githubApiSearchRepos(params, cancelCallback)
      .then(apiSearchSuccess)
      .catch(apiSearchError);

    return () => cancel();
  }, [query, page]);

  return { repos, hasMore, loading, error };
}
