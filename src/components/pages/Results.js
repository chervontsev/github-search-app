import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  LinearProgress,
  Box,
} from '@material-ui/core';
import { githubApiSearchRepos } from '../../api/github';

export function Results() {
  const query = useLocation().search.substr(1);

  const [repos, setRepos] = useState([]);
  const [last, setLast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const observer = useRef();

  // Query params
  const [page, setPage] = useState(1);
  const per_page = 50;

  const fetchData = useCallback(() => {
    const params = { q: query, page, per_page };

    githubApiSearchRepos(params).then(({ data }) => {
      const newData =
        page === 1
          ? data.items
          : repos.concat(data.items).reduce((acc, it) => {
              if (!acc.find(({ id }) => id === it.id)) {
                acc.push(it);
              }
              return acc;
            }, []);

      setRepos(newData);
      setLoadMore(data.total_count > newData.length);
      setLoading(false);
    });
  }, [query, page]);

  const initInterseptor = () => {
    return new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: '200px' }
    );
  };

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    if (loadMore) {
      setLoading(true);
      observer.current = initInterseptor();
    }

    if (last) {
      observer.current.observe(last);
    }
  }, [last]);

  useEffect(() => {
    setPage(1);
    setRepos([]);
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  return (
    <div>
      {!!repos.length && (
        <Fragment>
          <Grid container spacing={2}>
            {repos.map((repo) => (
              <Grid item xs={12} sm={6} md={4} key={repo.id}>
                <Link to={`/${repo.full_name}`}>
                  <Card>
                    <CardHeader
                      title={repo.name}
                      subheader={repo.owner.login}
                      avatar={<Avatar src={repo.owner.avatar_url} />}
                    />
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
          {loadMore && <div ref={setLast} />}
        </Fragment>
      )}

      {loading && (
        <Box py={4}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
}
