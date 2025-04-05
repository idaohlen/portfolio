export default [
  {
    title: 'Jobchaser',
    year: '2025',
    tagline: 'An assignment to create a job searching app using React and Next.js with a component library.',
    repoUrl: 'https://github.com/idaohlen/u07-jobchaser',
    previewUrl: 'https://u07-jobchaser.vercel.app/',
    description: `
      <p>The main feature of the Jobchaser app is browsing a list of jobs and being able to filter them by different queries. The page features a toggleable dark mode, and has a bookmarks feature.</p>
      <p>This project was my first introduction into working with <b>React</b>, along with <b>Next.js</b>. We were also assigned to work with a component library of our choice. As I have prior experience working with <b>Vue.js</b> the concepts of a JavaScript framework was not unfamiliar to me, but it took some effort to translating my existing Vue knowledge into React concepts. There are some similarities, but a lot of differences as well, but once I got the basics cleared up and learn to "think in React" I now feel quite comfortable working with both frameworks.</p>
      <p>I explored a couple of different React component libraries and settled on <a href="https://www.heroui.com" target="_blank">HeroUI</a>, as it had a sleek and modern design that I enjoyed, and was easy to work with once I got it set up. I've worked with component libraries before, and although I quite enjoy manual styling with CSS I can appreciate using component libraries to get up and running quicker and not have to code and design every single thing from scratch.</p>
      <p>Job data is fetched from the <a href="https://remotive.com" target="_blank">Remotive</a> API, as well as the following libraries:</p>
      <ul>
        <li><b>Redux Toolkit</b> for state management</li>
        <li><b>react-hook-form</b> for handling forms</li>
        <li><b>framer-motion</b> for animations and page transitions</li>
        <li><b>DOMPurify</b> to be extra safe when rendering HTML from a third party source</li>
        <li><b>date-fns</b> for natural language date formatting</li>
      </ul>
    `,
    tags: ['HTML', 'CSS', 'TypeScript', 'React', 'Next.js'],
    images: [
      'jobchaser__00.png',
      'jobchaser__01.png',
      'jobchaser__02.png',
      'jobchaser__03.png',
      'jobchaser__04.png',
      'jobchaser__05.png',
    ]
  },
  {
    title: 'Todolist in TypeScript',
    year: '2025',
    tagline: 'This todolist project was our first introduction to working with TypeScript.',
    repoUrl: 'https://github.com/idaohlen/u05-todolist-typescript',
    previewUrl: 'https://idaohlen-todolist-typescript-local.netlify.app',
    description: `
      <p>This was my first real project working with TypeScript. Todolists aren't always that exciting, so I tried to implement some additional features like adding categories and date filters and create a fun and colorful design.</p>
      <p>The preview link is for a local storage version of the todolist, but it was originally built to sync with a <b>Supabase</b> database and included a user registration and login system. That code is featured in the repo, but as I cannot guarantee the availability of the Supabase database I've converted the todolist into a locally functioning version as well.</p>
      `,
    tags: ['HTML', 'CSS', 'TypeScript'],
    images: [
      'todolist-typescript__00.png',
      'todolist-typescript__01.png',
      'todolist-typescript__02.png',
    ]
  },
  {
    title: 'Webshop',
    year: '2024',
    tagline: 'A simple webshop interface that gets data from a third party API and implements Google Analytics.',
    repoUrl: 'https://github.com/idaohlen/u04-webshop',
    previewUrl: 'https://idaoh-js-webshop.netlify.app',
    description: `
      <p></p>
    `,
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: ['webshop-fetch__00.png']
  },
  {
    title: 'Quiz App',
    year: '2024',
    tagline: 'Our first assignment where we got to work in a team of multiple students was to create a quiz app using HTML, CSS and JavaScript.',
    repoUrl: 'https://github.com/idaohlen/u03-quiz-app',
    previewUrl: 'https://thereseperswalld.github.io/U03-Techtitans-Quiz/',
    description: `

      <p><b>The team:</b> <a href="https://github.com/johansson-andreas" target="_blank">Andreas Johansson</a>, <a href="https://github.com/idaohlen" target="_blank">Ida Öhlén</a>, <a href="https://github.com/Martinsodersten" target="_blank">Martin Södersten</a>, <a href="https://github.com/TheresePerswalld" target="_blank">Therése Perswalld</a></p>

      <p>After sorting out the logistics of how we were going to plan and structure the project, we drew a simple wireframe for the quiz app that we then proceeded to develop into a functioning prototype of the most important parts of the app.</p>

      <p>Our philosophy while developing the app was to make sure everyone was involved with planning and execution, and making sure that everyone was following along and understanding the code we were writing. We worked both individually and in pairs while coding.</p>

      <p>I took the lead on developing some mockup designs in <b>Figma</b>, and together we decided on what designs looked best and what parts needed tweaking. After that we worked on implementing our final design with <b>HTML and CSS</b>, and finished up the project by wiping out a few bugs and prepared to present our project to our teacher and the rest of the class.</p>
    `,
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      'quiz-app__00.png',
      'quiz-app__01.png',
      'quiz-app__02.png',
      'quiz-app__03.png',
      'quiz-app__04.png',
      'quiz-app__05.png',
    ]
  },
  {
    title: 'Personal Portfolio Page',
    year: '2024',
    tagline: `Moving on from learning the basics of HTML and CSS and stepping into the bigger world of JavaScript, we were assigned to design our own portfolio pages and utilize JavaScript in a couple of different ways.`,
    repoUrl: 'https://github.com/idaohlen/u02-personal-portfolio-page',
    previewUrl: 'https://idaohlen-u02.netlify.app',
    description: `
      <p>As a continuation from our earlier assignment, we were given free reigns to design a portfolio page to our own liking with the implimentation of JavaScript functionality of our own chosing.</p>

      <p>I went for a simple design, and already having an idea in mind I went straight into HTML and CSS without doing a mockup in Figma first. I tried to play around a bit with transitions and explored the <b>Intersection Observer API</b>.</p>

      <p>In this project I've utilized JavaScript in the following ways:</p>

      <ul>
        <li>Making the navigation menu toggleable on mobile</li>
        <li>Used Intersection observer to resize the introduction section upon scrolling down/up</li>
        <li>A horizontally scrolling marquee for displaying technologies I've worked with</li>
        <li>Fetch repositories from my GitHub to display in the "Projects" section</li>
        <li>Display a modal when clicking on a project in the "Projects" section</li>
      </ul>
    `,
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      'portfolio-assignment__00.png',
      'portfolio-assignment__01.png',
    ]
  },
  {
    title: 'Code a Figma Design',
    year: '2024',
    tagline: 'Our first assignment was to code a portfolio site using HTML and CSS based on a Figma design.',
    repoUrl: 'https://github.com/idaohlen/u01-code-a-figma-design',
    previewUrl: 'https://idaohlen-u01.netlify.app',
    description: `
      <p>In this project we got to familiarize ourselves with <b>Figma</b> and how to convert an existing design into <b>HTML and CSS</b>, which we'd been learning for a few weeks. I already have many years of prior experience of working with HTML and CSS, so by this point I have a good eye for structuring a design into HTML elements and a decent mental library of available CSS properties.</p>
      <p><b>Figma</b> as a tool was new for me, but it was also kind of familiar as I've worked with graphic design tools like the Adobe suite and Affinity designer, so the interface and concepts were easy to adapt to.</p>
      
      <p>I also learned more about using clever CSS-only solutions for implementing things like a dark mode switch. The method I used takes advantage of the fact that a label connected to an HTML input element acts like an extension of the input, i.e. when you click on the label it's like clicking on the input itself.</p>

      <p>"Hacky" CSS solutions like this can have drawbacks like poorer accessability for user, so although cool to play around with, a lot of the time it is better to utilize JavaScript in the real world for behavior logic like this.</p>
    `,
    tags: ['HTML', 'CSS'],
    images: [
      'figma-portfolio__00.png',
      'figma-portfolio__01.png',
      'figma-portfolio__02.png',
    ]
  },
]