# entain-demo

Demo project for entain

# Notes

During the interview, we were talking about technologies and approaches that are used in Entain. According to that I decided to follow them as well as the bonus points in the task description and develop a separate API service and React frontend. Personally, I would build the demo as a single piece using Next.js, because I find this framework very advanced and full of handy features, but as Entain uses NestJS, it will be my choice for API service. React frontend will be bundled by Webpack and styled with Styled components as we also mentioned that (Tailwind CSS would be my first choice as it is easy to use and it allows to have styling right next to the component rather than somewhere else in the file).
I will use mono-repo approach, that we mentioned during our talk, and store all projects in different folders in a single repository.

<!-- At first I wanted to create single Docker Compose file to run all containers with single command and in one group and docker network. This would allow easier navigation between components when they are all running on one machine. However, usually in production instances of services and database are located on different machines. In this case single Compose file is wrong choice -->

<!-- This would allow easier deployment and building process with Docker Compose, where all the containers will be described in a single compose file. -->
