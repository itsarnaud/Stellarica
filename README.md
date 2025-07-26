# Stellarica 🤖

Stellarica is a Discord moderation bot built with Discord.js that provides essential moderation tools for server administrators and moderators.

## ✨ Features

- **Complete Moderation** : Ban, kick, mute, warn with logging system
- **Optimized User Management** : Automatic on-demand user registration
- **Prisma Database** : Secure storage with MySQL
- **Slash Commands** : Modern Discord interface
- **History System** : Complete tracking of moderation actions

## 📋 Command Reference

| Command | Description | Required Permission |
|---------|-------------|-------------------|
| `/ban` | Ban a user from the server | BanMembers |
| `/kick` | Kick a user from the server | KickMembers |
| `/mute` | Temporarily mute a user | ModerateMembers |
| `/unmute` | Remove mute from a user | ModerateMembers |
| `/warn` | Give a warning to a user | ModerateMembers |
| `/warnings` | View warnings for a user or all users | None |
| `/delwarn` | Delete warnings for a user | ModerateMembers |
| `/sync-users` | Manually synchronize all members | Administrator |
| `/ping` | Check if the bot is online | None |

## 🛠️ Technical Details

Stellarica is built with:

- **Node.js** - JavaScript runtime
- **Discord.js v14** - Modern Discord library
- **Prisma** - ORM for database management
- **MySQL** - Relational database
- **Slash Commands** - Modern Discord user interface

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/itsarnaud/Stellarica.git
   cd Stellarica
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configuration**
   - Create a `.env` file at the root
   - Add your Discord token: `DISCORD_TOKEN=your_token_here`
   - Configure database URL: `DATABASE_URL=mysql://...`

4. **Initialize the database**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the bot**

   ```bash
   node main.js
   ```

## 🗂️ Project Structure

```text
Stellarica/
├── commands/          # Bot slash commands
├── events/            # Discord event handlers
├── fonctions/         # Utility functions
├── loaders/           # Module loaders
├── prisma/           # Database schema and migrations
├── generated/        # Generated Prisma client
└── main.js          # Main entry point
```

## 💡 Implemented Best Practices

- **No massive sync on startup** : No more loading all users at launch
- **Smart registration** : Users are added only when necessary
- **Robust error handling** : Proper try/catch in all commands
- **Modular code** : Clear separation between commands, events, and utilities

## 🔧 Development Status

This project is currently in active development. New features and improvements are being added regularly. Community feedback and ideas are highly welcome! If you have suggestions or want to contribute to the project, please feel free to open an issue or submit a pull request 😁❤️
