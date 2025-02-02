[![Netlify Status](https://api.netlify.com/api/v1/badges/d057f9f6-6218-4aa9-b628-60e35439ddce/deploy-status)](https://app.netlify.com/sites/next-prompt/deploys)

# Next Prompt

**[next-prompt.netlify.app](https://next-prompt.netlify.app/)**

Next.js application for storing and managing AI prompts.

![Next.js 15](https://img.shields.io/badge/-Next.js%2015-000000?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/-React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Auth.js 5](https://img.shields.io/badge/-Auth.js%205-FF6B6B?style=flat-square&logo=authjs&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-47A248?style=flat-square&logo=mongoose&logoColor=white)

<img src="public/readme/next-prompt-screen.png" width="500" alt="Next Prompt app screenshot" />

_(Based on the [Next.js Full Course](https://www.youtube.com/watch?v=wm5gMKuwSYk) by [`@javascriptmastery`](https://www.youtube.com/@javascriptmastery), with special thanks to [Akos Putoczky](https://www.linkedin.com/in/akos-putoczky/) for the example prompts)_

I've enhanced the original project with optimizations, best practices, and modern Next.js features while exploring the framework's capabilities

## Features

- User authentication
  - Sign in with Google
  - Sign out
  - Protected pages and server actions
- Prompt CRUD using server actions
  - Create prompt with zod validation
  - Update prompt using the same form component
  - Read prompt
  - Delete prompt
- Use DAL _(Data Access Layer)_
- Use server components when possible

## TODO

- Prompt search _(by prompt, tag or username)_
- Prompt filtering by tag
- View other user's profile (`profile/[username]`)
- Authentication in one place (middleware)
- Prompt delete confirmation
