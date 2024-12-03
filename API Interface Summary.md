# API Interface Summary

## ReplyController APIs

| **API Method** | **URL**                 | **Parameters**                                               | **Description**                     |
| -------------- | ----------------------- | ------------------------------------------------------------ | ----------------------------------- |
| **GET**        | `/replies/post/:postId` | `postId` (Path): The ID of the post to retrieve replies for  | Get all replies for a specific post |
| **POST**       | `/replies?postId=1`     | `postId` (Query): The ID of the post to which the reply belongs | Create a new reply for a post       |
| **PUT**        | `/replies/:id`          | `id` (Path): The ID of the reply to be updated               | Update a specific reply             |
| **DELETE**     | `/replies/:id`          | `id` (Path): The ID of the reply to be deleted               | Delete a specific reply             |
| **POST**       | `/replies/:id/like`     | `id` (Path): The ID of the reply to like                     | Like a specific reply               |
| **POST**       | `/replies/:id/unlike`   | `id` (Path): The ID of the reply to unlike                   | Unlike a specific reply             |

## PostController APIs

| **API Method** | **URL**                            | **Parameters**                                       | **Description**                            |
| -------------- | ---------------------------------- | ---------------------------------------------------- | ------------------------------------------ |
| **GET**        | `/posts`                           | None                                                 | Get all posts                              |
| **GET**        | `/posts/:id`                       | `id` (Path): The ID of the post to retrieve          | Get a specific post by ID                  |
| **POST**       | `/posts`                           | Request Body: Post data (title, content, etc.)       | Create a new post                          |
| **PUT**        | `/posts/:id`                       | `id` (Path): The ID of the post to be updated        | Update a specific post by ID               |
| **DELETE**     | `/posts/:id`                       | `id` (Path): The ID of the post to be deleted        | Delete a specific post by ID               |
| **GET**        | `/posts/category/:category`        | `category` (Path): The category of posts to retrieve | Get posts by category                      |
| **GET**        | `/posts/category/:category/latest` | `category` (Path): The category of posts to retrieve | Get the latest posts (up to 3) by category |
| **POST**       | `/posts/:postId/like`              | `postId` (Path): The ID of the post to like          | Like a specific post                       |
| **POST**       | `/posts/:postId/unlike`            | `postId` (Path): The ID of the post to unlike        | Unlike a specific post                     |

## Controller APIs

| **API Method** | **URL**              | **Parameters**                                            | **Description**              |
| -------------- | -------------------- | --------------------------------------------------------- | ---------------------------- |
| **GET**        | `/userNum/:username` | `username` (Path): The username for which to find userNum | Find the userNum by username |

## Create Reply

### API Method: `POST`
### URL: `/replies`
### Request Body:
```json
{
    "content": "reply test 1",
    "author": {
        "userNum": 3
    }
}
```

## Update a Reply

### API Method: `PUT`
### URL: `/replies/:id`
### Request Body:
```json
{
  "content": "This is the updated reply content. The topic has evolved, and I want to add more insights."
}
```

## Create a Post

### API Method: `POST`
### URL: `/posts`
### Request Body:
```json
{
 "subject":"post test 13",
 "content":"post test 13",
 "category":"이벤트",
 "authorUserNum":2
}
```

## Update a Post

### API Method: `PUT`
### URL: `/posts/:id`
### Request Body:
```json
{"title":"Updated Post Title",
 "content":"Updated content for the post.",
 "category":"Tech",
 "authorUserNum":123}