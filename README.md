# Orbit

## Overview

Elmo Hikes is a client-side JavaScript web application that helps users discover and explore hiking trails. The app displays a curated list of hike trails, each with details such as name, location, difficulty, and an image. Users can browse the list and mark their favorite trails for easy access later.

Developed for the COMP 1800 course, this project applies User-Centred Design practices and agile project management, and demonstrates integration with Firebase backend services for storing user favorites.

---

## Features

- Create, edit, and delete tasks in a personal to-do list
- View tasks due today, this week, and tasks shared by groups
- Create groups, invite members, and share tasks within groups
- Customize your profile with display name, pronouns, and avatar
- Responsive design for desktop and mobile

---

## Technologies Used

Example:

- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend**: Firebase for hosting
- **Database**: Firestore

---

## Usage

1. Open your browser and visit `http://localhost:3000`.
2. Browse the list of hiking trails displayed on the main page.
3. Click the heart icon (or similar) to mark a trail as a favorite.
4. View your favorite hikes in the favorites section.

---

## Project Structure

```
1800_202530_DTC04/
├── src/
│   ├── components/
│   │    ├──Main/
│   │    │   └── main.js
│   │    ├── Navbar/
│   │    │   └── top-nav.js
│   │    ├── Popups/
│   │    │   ├── alert.js
│   │    │   └── popup-form-header.js
│   │    ├── Profilepage/
│   │    │   ├── avatar.js
│   │    │   └── profile.js
│   │    ├── Search/
│   │    │   └── search-add-result.js
│   │    ├── Sharepage/
│   │    │   ├── add-group.js
│   │    │   ├── add-member.js
│   │    │   └── edit-group.js
│   │    ├── Tasks/
│   │    │   ├── add-task.js
│   │    │   ├── complete-button.js
│   │    │   ├── share-button.js
│   │    │   ├── share-task.js
│   │    │   ├── task-box.js
│   │    │   └── todo.js
│   │    ├── site-footer.js
│   │    └── site-navbar.js
│   ├── styles/
│   │   └── style.css
│   ├── app.js
│   ├── authentication.js
│   ├── firebaseConfig.js
│   ├── loginSignup.js
│   └── utils.js
├── public/images/
├── index.html
├── login.html
├── main.html
├── profile.html
├── sharepage_Groups.html
├── todo.html
├── skeleton.html
├── tailwind.config.js
├── vite.config.js
├── package.json
├── package-lock.json
├── README.md
```

---

## Contributors

- **Alex Lu** - BCIT CST Student who loves hiking, reading, and has a passion for game development. Fun fact: Has re-read the Artemis Fowl series 5 times
- **Ruize Sun** - BCIT CST Student with a passion for outdoor adventures and user-friendly applications. Fun fact: Can't solve a Rubik's Cubes at all.
- **Meiqi Zhao** - BCIT CST student who likes baking and photography. Fun fact: I like watermelon, but do not like watermelon-flavored drinks.

## Acknowledgments

- Trail data and images are for demonstration purposes only.
- Code snippets were adapted from resources such as [Stack Overflow](https://stackoverflow.com/) and [MDN Web Docs](https://developer.mozilla.org/).
- Icons sourced from [FontAwesome](https://fontawesome.com/) and images from [Unsplash](https://unsplash.com/).

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
