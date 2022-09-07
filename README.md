## DeepThought Task 1 - Event API

### Briefing

- The [eventsRouter](./controllers/events.ts) contains the routes for event api.
- The image is saved as a Base64 encoded string.
- I have used [zod](https://zod.dev/) for runtime schema validation.
- I have also created a `GET /nudge/:id` route to fetch a single event.

## Project setup

### Environment Variables

- These are optional, as I have provided default values for them.

`PORT: Server Port. DEFAULT: 3000`

`MONGODB_URI: URI of Mongo DB Server. DEFAULT: mongodb://localhost:27017/dt-task1`

### Starting up the project

- I have used [PNPM](https://pnpm.io/), but the project should run with NPM as well.

- To install PNPM

```shell
npm i -g pnpm
```

- Run via PNPM

```shell
pnpm install
pnpm run dev
```

- Run via NPM

```shell
npm install
npm run dev
```

### Testing APIs

- I used these cUrl to test my API

#### Create

```shell
curl --request POST \
  --url http://localhost:3000/api/v3/app/events \
  --data '{"type":"event","uid":"15","name":"Event 1","tagline":"DT Event","schedule":"2022-09-07T13:45:15.337Z","description":"A DT Event about Sciencsation","moderator":19,"category":"Fun","sub_category":"Games","regor_rank":123,"attendees":[123,124,155],"image":"data:image/jpeg;base64,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"}'
```

#### Read

```bash
curl --request GET \
  --url http://localhost:3000/api/v3/app/events/{event_id}
```

#### Update

```bash
curl --request PUT \
  --url http://localhost:3000/api/v3/app/events/{event_id} \
  --data '{"name":"Evening Routine"}'
```

#### Delete

```bash
curl --request DELETE \
  --url http://localhost:3000/api/v3/app/events/{event_id}
```

# Task - 2

- [Link](./Task2.md)
