# simple-xmlhttp-request

A simple XmlHttpRequest package

## Usage

### GET request

```javascript
import Request from 'simple-request';

let request = new Request();
let result = request.get('/your-url-here');
```

### POST request

```javascript
import Request from 'simple-request';

let request = new Request();
let result = request.post('/your-url-here', {
    key1 : 1,
    key2 : 2,
});
```

## Options

### requestType

Sets the request header type.

Allowed values : `json`, `text`
Default: `json`

### responseType

Sets the expected response header type.

Allowed values : `json`, `text`
Default: `json`
