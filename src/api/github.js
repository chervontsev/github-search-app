import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
});

export const githubApiSearchRepos = (params) => {
  return githubApi.get('/search/repositories', { params });
};

export const githubApiGetRepo = (user, repo) => {
  return githubApi.get(`/repos/${user}/${repo}`);
};
