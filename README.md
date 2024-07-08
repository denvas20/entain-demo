# entain-demo

Demo project for entain

# Notes

During the interview, we were talking about technologies and approaches that are used in Entain. According to that I decided to follow them as well as the bonus points in the task description and develop a separate API service and React frontend. Personally, I would build the demo as a single piece using Next.js, because I find this framework very advanced and full of handy features, but as Entain uses NestJS, it will be my choice for API service. React frontend will be bundled by Webpack and styled with Styled components as we also mentioned that (Tailwind CSS would be my first choice as it is easy to use and it allows to have styling right next to the component rather than somewhere else in the file).
I will use mono-repo approach, that we mentioned during our talk, and store all projects in different folders in a single repository.

In backend Postgres ralational database was selected. Relational database is the most convinient way to store such structured and typical data like movie list. TypeORM was chosen to connect and operate with database as suggested by NestJS docs.

It would be more reasonable to plug backend directly to movie API. "www.themoviedb.org" has well structured endpoints for filtered movie search. But as you probably wish to see some db interraction, I will use db to store movies. It doesn't look like "www.themoviedb.org" has an easy and obvious way to get all detailed movie data at once.
