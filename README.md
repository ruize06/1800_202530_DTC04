# Orbit

## Overview

Elmo Hikes is a client-side JavaScript web application that helps users discover and explore hiking trails. The app displays a curated list of hike trails, each with details such as name, location, difficulty, and an image. Users can browse the list and mark their favorite trails for easy access later.

Developed for the COMP 1800 course, this project applies User-Centred Design practices and agile project management, and demonstrates integration with Firebase backend services for storing user favorites.

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

- **Alex Lu** - BCIT CST Student who loves hiking, reading, and has a passion for game development. Fun fact: Has re-read the Artemis Fowl series 5 times
- **Ruize Sun** - BCIT CST Student with a passion for outdoor adventures and user-friendly applications. Fun fact: Can't solve a Rubik's Cubes at all.
- **Meiqi Zhao** - BCIT CST student who likes baking and photography. Fun fact: I like watermelon, but do not like watermelon-flavored drinks.

## Acknowledgments

- Trail data and images are for demonstration purposes only.
- Icons sourced from [TablerIcons](https://tabler.io/) and images 

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
