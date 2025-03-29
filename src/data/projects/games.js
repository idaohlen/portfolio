export default [
  {
    title: 'Sharksweep',
    year: '2024',
    tagline: 'A fun little attempt at creating my own version of "Minesweep", but I switched out the mines for sharks.',
    repoUrl: 'https://github.com/idaohlen/js-sharksweep',
    previewUrl: 'https://idaohlen.github.io/js-sharksweep/',
    description: `
      <p>Looking at a list of smaller games to try and code, <b>Minesweep</b> seemed the most challenging and like a project I could learn a lot from.</p>

      <p>Going into it I tried to use as much of my own knowledge as possible to try and solve the challenges of designing the game. In the back of my head I knew of the concept of recursive functions, and at one point I realized that's what I had to utilize to implement the "flood fill" effect when clicking on an "empty" tile. Recursion is a tricky concept to wrap your head around, so I had to take some time to figure out how to implement it and look at examples of how to implement flood fill in other contexts.</p>

      <p>I implemented a difficulty modifier by adding midifiable grid size and shark amount to the game. I noticed some performance and graphical issues when setting the grid size to a bigger number, so I added a limit which I deemed appropriate to reduce the rendering issues.</p>
    `,
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      'sharksweep__00.png',
      'sharksweep__01.png',
      'sharksweep__02.png',
    ]
  },
]