# 🎮 PIXEL RUSH

> A retro-style 2D platformer game built with HTML5 Canvas, Java Spring Boot, and MySQL.

![PIXEL RUSH](https://img.shields.io/badge/Game-PIXEL%20RUSH-00ffaa?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-24-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-6DB33F?style=for-the-badge&logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![JavaScript](https://img.shields.io/badge/JavaScript-Canvas-yellow?style=for-the-badge&logo=javascript)
![Maven](https://img.shields.io/badge/Maven-3.9+-C71A36?style=for-the-badge&logo=apachemaven)

---

## 🕹️ About The Game

**PIXEL RUSH** is a retro-inspired 2D platformer game developed as a full-stack Java project.

The player explores different levels, jumps across platforms, collects coins, avoids enemies, earns points, and reaches the exit to complete each level.

The project combines a browser-based game frontend with a Java Spring Boot backend and MySQL database architecture.
<img width="1896" height="907" alt="image" src="https://github.com/user-attachments/assets/540f1923-47d8-44a3-b0bc-6388b605c131" />

---

## ✨ Features

### 🎮 Gameplay

- 🧍 Player movement
- 🦘 Jump mechanics
- 🟫 Platform-based levels
- 🪙 Collectible coins
- 👾 Moving enemies
- ❤️ Health system
- ⭐ Score system
- 🚪 Level exit system
- 💀 Game-over system
- 🏆 Level completion system
- 🎯 Multiple levels
- 🎮 Keyboard controls

### 🎨 Retro UI

- Pixel-inspired interface
- Retro game typography
- Dark gaming theme
- Neon accent colors
- Responsive layout
- HTML5 Canvas rendering
- Pixelated graphics

### ⚙️ Backend

The project uses a Java backend architecture with:

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven
- REST API architecture

### 🗄️ Database

MySQL is used for persistent game data.

Planned database features include:

- Player accounts
- Player profiles
- Game progress
- Scores
- Level completion
- Leaderboards

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Game structure |
| CSS3 | UI and styling |
| JavaScript | Game logic |
| Canvas API | 2D game rendering |

## Backend

| Technology | Purpose |
|---|---|
| Java | Backend programming |
| Spring Boot | Backend framework |
| Spring Web | REST APIs |
| Spring Data JPA | Database access |
| Maven | Dependency management |

## Database

| Technology | Purpose |
|---|---|
| MySQL | Game data storage |
| Hibernate | ORM |

---

# 📁 Project Structure

```text
PIXEL-RUSH/
│
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/
│           │       └── pixelrush/
│           │           └── PixelRushApplication.java
│           └── resources/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── game.js
│   └── assets/
│
├── .gitignore
└── README.md
```

---

# 🎮 Controls

| Key | Action |
|---|---|
| `A` / `←` | Move Left |
| `D` / `→` | Move Right |
| `W` / `↑` / `SPACE` | Jump |

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Dhairyamhatre7/PixelRush.git
cd PixelRush
```

---

# 🖥️ Frontend Setup

Open a terminal:

```bash
cd frontend
```

Start the frontend server:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5500/
```

---

# ☕ Backend Setup

Open another terminal:

```bash
cd backend
```

Build the project:

```bash
mvn clean install
```

Run Spring Boot:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

# 🗄️ MySQL Configuration

Create the database:

```sql
CREATE DATABASE pixel_rush;
```

Configure your local database credentials using your local configuration.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pixel_rush
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

> ⚠️ Never commit your real database password to GitHub.

---

# 🧠 Game Architecture

```text
                    PIXEL RUSH
                         │
            ┌────────────┴────────────┐
            │                         │
       FRONTEND                    BACKEND
            │                         │
     HTML / CSS / JS             Spring Boot
            │                         │
       Canvas Game                 REST API
            │                         │
            └────────────┬────────────┘
                         │
                       MySQL
                         │
                Player / Scores /
                 Progress Data
```

---

# 🗺️ Planned Levels

The game is designed to support multiple environments and progressively difficult levels.

### 🌲 Level 1 — Pixel Forest

Basic platforms, coins, enemies, and exit.

### 🏭 Level 2 — Cyber Factory

More difficult platforms and enemy patterns.

### 🌋 Level 3 — Lava Zone

Hazard-based gameplay and challenging jumps.

### ❄️ Level 4 — Ice World

Slippery platforms and new enemies.

### 🏰 Level 5 — Dark Castle

Advanced enemies and castle environments.

### 🌃 Level 6 — Neon City

Fast-paced platforming with a cyberpunk environment.

### 🚀 Level 7 — Space Station

Low-gravity style gameplay.

### 👹 Level 8 — Monster World

Stronger enemies and special challenges.

### ⚡ Level 9 — Electric Zone

Moving platforms and electrical hazards.

### 👑 Level 10 — Final Boss

Final boss battle and game completion.

---

# 🔮 Future Features

The project is continuously being developed.

Planned features include:

- 🔐 User registration and login
- 👤 Player profiles
- 💾 Save game progress
- 🏆 Global leaderboard
- 🗺️ Level selection
- 🔓 Level unlocking
- 👹 Boss battles
- ⚡ Power-ups
- ❤️ Extra-life system
- 💰 Collectible items
- 🎵 Background music
- 🔊 Sound effects
- 🎨 Improved pixel-art assets
- 📱 Better mobile support
- 🛠️ Admin dashboard
- 📊 Player statistics
- 🌐 Online multiplayer features

---

# 📸 Screenshots

Screenshots will be added as the game development progresses.

Planned screenshots:

```text
screenshots/
├── home-screen.png
├── gameplay.png
├── level-complete.png
├── game-over.png
└── leaderboard.png
```

---

# 📈 Development Roadmap

```text
[✓] Project Setup
[✓] Git Repository
[✓] GitHub Repository
[✓] Frontend Setup
[✓] Canvas Game
[✓] Player Movement
[✓] Jump System
[✓] Platforms
[✓] Coins
[✓] Enemies
[✓] Health System
[✓] Score System
[✓] Level System

[ ] Level Selection
[ ] 10+ Levels
[ ] Boss Battles
[ ] Power-Ups
[ ] Sound System
[ ] User Registration
[ ] Login System
[ ] MySQL Player Database
[ ] Save Progress
[ ] Online Leaderboard
[ ] Admin Dashboard
[ ] Final Release
```

---

# 🔐 Security

Sensitive configuration files are excluded from Git using `.gitignore`.

Never upload:

```text
Passwords
API keys
Database credentials
Secret tokens
.env files
```

---

# 👨‍💻 Developer

## Dhairya Mhatre

Full-Stack Java / Game Development Project

GitHub:

https://github.com/Dhairyamhatre7

Repository:

https://github.com/Dhairyamhatre7/PixelRush

---

# 📜 License

This project is currently developed for educational and personal project purposes.

---

# ⭐ Support

If you find the project interesting, consider giving the repository a ⭐ on GitHub.

---

# 🎮 PIXEL RUSH

**RUN • JUMP • COLLECT • SURVIVE • RUSH**

> The pixel adventure has just begun. 🚀
