# redirect
## docker container which redirects all traffic based on subdomain or requested path

```bash
#cat nginx.conf
...
location / {
    proxy_pass http://localhost:12701;
    proxy_set_header Host      $host:$server_port;

}
...
```

## basic redirect config
```json
{
    "base_redirect": "https://",
    "empty_url": "profile.withjannis.dev",
    "redirects": {
        "github": "github.com/withjannis",
        "twitter": "twitter.com/withjannis"
    }
}
```