# Release Day — starter app of module 6

Node.js app of the Docker 2026 course: a page with a greeting and a visit counter.

- **Port:** 3000.
- **Routes:** `/` — the greeting and the number of visits; `/crash` — ends the process with code 1 (for experiments with the restart policy).
- **Data:** the counter is stored in `/data/counter.txt` — mount a named volume at `/data`, otherwise the counter disappears along with the container.
- **Image build:** `.github/workflows/build.yml` — runs on a git tag `v*`, builds the image for `linux/amd64` and `linux/arm64`. Before your first tag, put your Docker Hub namespace into the `images` input and create the `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets in your repository settings.

Running without Docker Hub:

```bash
docker build -t app:dev .
docker run -d -p 8080:3000 -v data:/data --name app app:dev
```
