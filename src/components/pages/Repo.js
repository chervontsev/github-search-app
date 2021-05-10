import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button,
  Avatar,
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { githubApiGetRepo } from '../../api/github';

export function Repo() {
  const { user, repo } = useParams();
  const history = useHistory();

  const [repoData, setRepoData] = useState(null);

  const fetchRepo = async () => {
    githubApiGetRepo(user, repo).then(({ data }) => {
      setRepoData(data);
    });
  };

  const handleBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  useEffect(() => {
    fetchRepo();
  }, []);

  if (!!repoData) {
    const {
      name,
      size,
      created_at,
      language,
      description,
      stargazers_count,
      html_url: repo_url,
      owner: { login, avatar_url, html_url },
    } = repoData;

    const date = new Date(created_at).toString();
    const formatedSize = (size / 1000).toFixed(2);

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleBack}>
          Back
        </Button>

        <Box mt={2}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6">
                  <span>Repo: </span>
                  <a href={repo_url} rel="noreferrer" target="_blank">
                    {name}
                  </a>
                </Typography>
              }
              subheader={
                <span>
                  <span>By: </span>
                  <a href={html_url} rel="noreferrer" target="_blank">
                    {login}
                  </a>
                </span>
              }
              avatar={<Avatar src={avatar_url} />}
            />
            <CardContent>
              <Typography paragraph>{description}</Typography>
              <hr />
              <Typography paragraph>
                <strong>Created at:</strong> {date}
              </Typography>
              <Typography paragraph>
                <strong>Language:</strong> {language}
              </Typography>
              <Typography paragraph>
                <strong>Stars:</strong> {stargazers_count}
              </Typography>
              <Typography paragraph>
                <strong>Size:</strong> {formatedSize} Mb
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  }

  return (
    <Box py={4}>
      <LinearProgress />
    </Box>
  );
}
