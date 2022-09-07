- [Task - 1](README.md)

#### Task - 2 API Documentation

## Nudge Creation

`BASE URL: www.eventapp.com/api/v1`

### Error Structure

- Incase if the API fails or the payload is malformed, the API will return an object following the given structure

```json
{
  "success": false,
  "error": {
    "code": "ID4668",
    "description": "ID could not be found"
  }
}
```

### Endpoints

### `GET /nudge/:id`

Returns the nudge by its corresponding ID. Example:

```
GET /nudge/6317194f44b6b0d10441c070
```

- Returns the following data.

```json
{
    "id": "6317194f44b6b0d10441c070",
    "title": "Morning Routine",
    "invitation": "Workshop on building productive morning routine"
    "description": "Learn how to decrease your mobile time when waking up, be more productive from the beginning of the day, and find yourself more refreshed and energized.",
    "tags": {
        "event": {"id": "6317164fc123a5b42a74460b"},
        "article": {"id": "6317164ac521a5b12374460a"}
    }
    "image_url": "https://picsum.photos/200/300",
    "schedule_date": "2022-09-06T11:03:02.960Z",
    "icon_url": "https://picsum.photos/300/300"
}
```

- If the ID is incorrect, or there is any problem, a json containing the error will be sent

```json
{
  "success": false,
  "error": {
    "code": "ID4668",
    "description": "ID could not be found"
  }
}
```

### `GET /nudge?limit={number}$page={number}`

Returns nudges in a paginated format.

- LIMIT
  - Default: 5
  - Maximum: 10

```
GET /nudge?limit=5$page=1
```

```json
{
    "limit": 5,
    "page": 1,
    "total": 305,
    "size": 5,
    "results": [
        {
            "id": "6317194f44b6b0d10441c070",
            "title": "Morning Routine",
            "invitation": "Workshop on building productive morning routine",
            "description": "Learn how to decrease your mobile time when waking up, be more productive from the beginning of the day, and find yourself more refreshed and energized.",
            "tags": {
                "event": {
                    "id": "6317164fc123a5b42a74460b"
                },
                "article": {
                    "id": "6317164ac521a5b12374460a"
                }
            },
            "image_url": "https://picsum.photos/200/300",
            "schedule_date": "2022-09-06T11:03:02.960Z",
            "icon_url": "https://picsum.photos/300/300"
        },
        ....
    ]
}
```

### `POST /nudge`

Creates a nudge

```
* -> Required
```

Attributes

- title: string\*
  - Specify the title of the nudge
- invitation: string\*
  - One line invitation, displayed on minimized nudge
- description: string\*
  - Brief description about the nudge
- tags: object\*
  - Contains the associated tag, should atleast contain one event or article
  - event
    - id: Id of the event
  - article
    - id: Id of the article
- image: Base64 encoded string

### Example

```bash
curl --request POST \
  --url https://www.eventapp.com/api/v1/nudge \
  --data '{"title":"Morning Routine","invitation":"Workshop on building productive morning routine","description":"Learn how to decrease your mobile time when waking up, be more productive from the beginning of the day, and find yourself more refreshed and energized.","tags":{"event":{"id":"6317164fc123a5b42a74460b"},"article":{"id":"6317164ac521a5b12374460a"}},"image_url":"https://picsum.photos/200/300","schedule_date":"2022-09-06T11:03:02.960Z","icon_url":"https://picsum.photos/300/300"}'
```

- Returns

```json
{
  "success": true
}
```

### `PUT /nudge/:id`

Update a nudge by its ID. Example:

```
PUT /nudge/6317194f44b6b0d10441c070
```

```bash
curl --request PUT \
  --url https://www.eventapp.com/api/v1/nudge \
  --data '{"title":"Morning Routine","invitation":"Workshop on building productive morning routine","description":"Learn how to decrease your mobile time when waking up, be more productive from the beginning of the day, and find yourself more refreshed and energized.","tags":{"event":{"id":"6317164fc123a5b42a74460b"},"article":{"id":"6317164ac521a5b12374460a"}},"image_url":"https://picsum.photos/200/300","schedule_date":"2022-09-06T11:03:02.960Z","icon_url":"https://picsum.photos/300/300"}'
```

- Returns either a successful response, or returns error

```json
{
  "success": false,
  "error": {
    "code": "ID4668",
    "description": "ID could not be found"
  }
}
```

### `DELETE /nudge/:id`

Delete a nudge by its ID.

- Returns the same response as updating a nudge.

```json
{
  "success": true
}
```

```json
{
  "success": false,
  "error": {
    "code": "ID4668",
    "description": "ID could not be found"
  }
}
```
