import school from './school-work.js';
import personal from './personal.js';
import other from './other.js';

function findById(category, id) {
  return category.find(project => project.id == id)
}

const projects = [
  findById(other, 1),
  findById(school, 3),
  findById(school, 5),
  findById(school, 2),
  findById(personal, 1),
]

export function featuredProjects(amount = 3) {
  return projects.slice(0, amount)
}