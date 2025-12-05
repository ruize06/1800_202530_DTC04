# Orbit

## Overview

Orbit is a client-side web application that aims to aid students with organization and planning. The app gives each user a personal to do list, and they can create groups with classmates and friends to always "Stay in Orbit" of each other.

Tasks can be shared between lists, and each has customization options with colours, deadlines, and longer descriptions for maximum versatility when users are planning. Orbit also offers a dashboard with summaries of upcoming tasks for an easy look into one's week without looking through lists.

---

## Features

- Create, edit, and delete tasks in a personal to-do list
- View tasks due today, this week, and tasks shared by groups
- Create groups, invite members, and share tasks within groups
- Customize your profile with display name, pronouns, and avatar
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
- Icons sourced from [TablerIcons](https://tabler.io/) and images

---

## Limitations and Future Work

### Limitations

- Limited trail details (e.g., no live trail conditions).
- Accessibility features can be further improved.

### Future Work

- Add streaks, badges, or points to motivate users to complete tasks consistently.
- Enable attaching documents or images directly to tasks for more context.
- Introduce permissions (e.g., admins, editors, viewers) for better collaboration.
- Let users choose how and when they’re reminded for tasks, daily habits.
- Provide charts showing productivity trends, group contributions, or completion rates.
- Make Orbit accessible to non-English speakers with translations.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
