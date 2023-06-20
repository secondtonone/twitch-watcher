# The Twitch Watcher

## Overview
The Twitch Watcher is tool to designed to help users receive drops from Twitch streams even when they are unable to watch the streams live. 

## Getting Started
Requirements:
- NodeJS v18.12.0
- Chrome/Chromium based Browser

To use the Twitch Watcher for drops, follow these steps:

1. Clone or download the package from the GitHub repository.
2. Install the required dependencies as specified in the package documentation.
```bash
npm install
```
3. Replace the placeholder values with the appropriate information according to your requirements in `.env` file:

| Configuration Key      | Description                                                                                                 |
|------------------------|-------------------------------------------------------------------------------------------------------------|
| `AUTH_TOKEN`           | The authentication token obtained from Twitch. It can be found in the browser's cookies using DevTools. Find key `auth-token` and copy its value.     |
| `USER_PAGE`            | The Twitch channel to monitor for drops.                                                                    |
| `DURATION`             | The duration of the stream in minutes. After this duration, the browser will automatically close.           |
| `RELOADING_COUNT`      | The number of times the browser will reload the page during the monitoring process.                          |
| `CRON_TIME`            | The specific time when the stream is expected to be online, in the format of a cron expression (https://en.wikipedia.org/wiki/Cron).     
| `BROWSER_PATH`         | The path to the browser installed on your system. For Chrome, type `chrome://version/` in the address bar and find the `Executable Path` line.

## License
The Twitch Watcher is released under the MIT License, granting users the freedom to use, modify, and distribute the package according to the terms specified in the license.

## Disclaimer
The Twitch Watcher is a third-party tool and is not affiliated with or endorsed by Twitch. It is developed and maintained independently, with the aim of enhancing the Twitch viewing experience for users interested in drops.
