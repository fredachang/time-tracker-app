# time-tracker-app

The Time Tracker app is the first app I built using the React Typescript framework. The original idea was conceived at the start of my 3-4 month sabbatical of learning how to code, as a way to manage my time across different projects/goals. I wanted the experience of tracking time to be fun instead of invoking a feeling of obligation/ticking off boxes so I focused heavily on the UI - which became inspired by the cyberpunk/dystopian/video game aesthetic. To help the bold aesthetic stay refreshed, I implemented a dynamic light vs dark colour scheme via Tailwind classes. I also didn't want the focus to be on the numbers at the end of the day (or working for the sake of hitting the target rather than being productive), so I abstracted them away into delibrately hard-to-read symbols on the table. Lastly, I implemented an optional 30 minutes timer with a ring tone inspired by the Pomodoro method that automatically clocks an half-hour slot when time is up. After experimenting with this method, I found that I was able to take consistent breaks while dividing work down into reasonable, easy-to-execute chunks, with full visibility of time spent across various life goals. 

The time data is stored via React use-local-storage and is designed to be refreshed on a weekly basis as the primary objective is to track short-term goals rather than having a full view of historical data. 

https://github.com/fredachang/time-tracker-app/assets/128881398/dc71ec91-1891-4782-a2fe-cb060a7055ed

Live site: https://freda-time-tracker-app.netlify.app/

