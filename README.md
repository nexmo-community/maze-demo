# Nexmo Maze Demo

Demo which shows moving in a maze via SMS directions. This project needs a lot of work and JS organization/help. Please feel free to contribute.

## Installation

Clone the project into the directory of your choosing and run `npm install`.

### Initialize the Database

Run the migrations using `node node_modules/.bin/sequelize db:migrate`

### Configure your Webhook

Configure your Nexmo number to send requests to the `/webhooks/incoming` path.

See it on Glitch: Glitch Link