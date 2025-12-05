# Orbit

## Overview

Orbit is a client-side web application that aims to aid students with organization and planning. The app gives each user a personal to do list, and they can create groups with classmates and friends to always "Stay in Orbit" of each other.

Tasks can be shared between lists, and each has customization options with colours, deadlines, and longer descriptions for maximum versatility when users are planning. Orbit also offers a dashboard with summaries of upcoming tasks for an easy look into one's week without looking through lists.

---

## Features

- Browse a list of curated hiking trails with images and details
- Mark and unmark trails as favorites
- View a personalized list of favorite hikes
- Responsive design for desktop and mobile

---

## Technologies Used

- **Frontend**: HTML, CSS/TailwindCSS, JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend**: Firebase for hosting
- **Database**: Firestore

---

## Usage

1. Open your browser and visit `https://orbit-4d26b.web.app/`.
2. Go to Your List and click the '+' button to add a task to your list.
3. Clicking on the task that appears allows you to edit the details.
4. Go to Groups and create a shared to do list by click 'Create New Group'.
5. Go into the new group and click the "add member" button (the first icon in the top right).
6. Find other users to join and add them, anyone in here can see the group's tasks.
7. Edit the group name/details or leave the group by clicking the members icon in the top right corner
8. Go back to Your List and click the share icon next to the task you created to share it to your group
9. Click on the circle to the left of your task to complete it
10. See your completed tasks by clicking on 'Show Completed' at the bottom of Your List
11. Go to the Home page to see an overview of tasks that are upcoming today and this week
12. Go to the Profile page to edit your account details like name and avatar.

---

## Project Structure

```
elmo-hikes/
├── src/
│   ├── main.js
├── styles/
│   └── style.css
├── public/
├── images/
├── index.html
├── package.json
├── README.md
```

---

## Contributors

**Alex Lu** - BCIT CST Student who loves hiking, reading, and has a passion for game development.
- **To do lists**: Created the core task management features like task creation, editing, completion, and sharing.
- **Database Structure**: Implemented the  Firestore collections and connected them for tasks and groups.
- **Navigation**: Built the features for navigating the site and searching for users/groups
**Ruize Sun** - BCIT CST Student with a passion for outdoor adventures and user-friendly applications. Fun fact: Can't solve a Rubik's Cubes at all.
**Meiqi Zhao** - BCIT CST student who likes baking and photography. Fun fact: I like watermelon, but do not like watermelon-flavored drinks.

## Acknowledgments

- Some code snippets adapted from:
  - [MDN Web Docs](https://developer.mozilla.org/en-US/)
  - [W3schools](https://www.w3schools.com/)
  - [W3schools](https://www.w3schools.com/)
  - Example code from **COMP1800** demos and instructions
- Icons sourced from [TablerIcons](https://tabler.io/) and images 
- Landing Page background from [Vecteezy](https://www.vecteezy.com/) -> [Image](https://static.vecteezy.com/system/resources/previews/024/790/556/non_2x/seamless-night-sky-stars-pattern-sketch-moon-space-planets-and-hand-drawn-star-illustration-outer-space-symbols-decorative-texture-cosmic-wallpaper-wrapping-paper-textile-outline-design-vector.jpg)

---

## Limitations and Future Work

### Limitations

- Limited trail details (e.g., no live trail conditions).
- Accessibility features can be further improved.

### Future Work

- Implement map view and trailhead directions.
- Add filtering and sorting options (e.g., by difficulty, distance).
- Create a dark mode for better usability in low-light conditions.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
