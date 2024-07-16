# How to build and run

```
# To build docker images for this project run
docker compose build

# To run containers
docker compose up -d
```

# Notes

All .env\* were intentionally excluded from .gitignore so that you dont have to create them.
Never recommended for real projects

Note that frontend hosted via both ways: docker and GitHub Pages
There is an Nginx container that exposes port 3000 to access frontend
Or access it via https://denvas20.github.io/entain-demo-page/

Database in hosted on port 5432, backend - on port 3100.
Make sure those ports are available on your machine.

# Frontend usage

To search movies by title enter search string into the text input and press either Enter on search icon.
To apply genre search, just select required genres. The list will be updates automatically considerring both search string and genres.
