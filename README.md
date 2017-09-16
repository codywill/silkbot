Silkbot v0.1.0
==============

Silkbot is a simple Discord bot for tracking and interacting with friends. It currently responds to a handful of basic commands and includes Jasmine unit tests.

auth.json should be populated with a bot token, and friends.json should be provided with at least one user to start.

### COMMANDS
- ![friend]
  - sends friend message
- !twitch
  - sends own twitch profile if set
- !bnet
  - sends own battle.net ID if set
- !add [friend] [properties (optional)]
  - adds new friend to list, default with empty properties
- !del [friend]
  - deletes friend from list (supervisor only)
- !set [friend] [property] [value]
  - sets friend property (supervisor only)
- !get [friend] [property]
  - returns friend property

### PROPERTIES
- twitch
  - should be populated with twitch ID, not URL
- bnet
- message
- role

### ROLES
- supervisor
- buddy