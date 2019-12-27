const blogs = [
  {
    "title": "Taking a year to eplain computer things",
    "author": "Julia Evans ",
    "url": "https://jvns.ca/blog/2019/09/13/a-year-explaining-computer-things/",
    "likes": 3,
    "user": {
      "username": "congdv",
      "name": "Cong Dao",
      "id": "5d902fcbb966c928cb49940f"
    },
    "id": "5d90376355eef532d37c938d"
  },
  {
    "title": "Damn itdsdsd",
    "author": "Julia Evans ",
    "url": "https://jvns.ca/blog/2019/09/13/a-year-explaining-computer-things/",
    "likes": 3,
    "user": {
      "username": "congd2v2",
      "name": "Cong Dao",
      "id": "5d902fb6b966c928cb49940e"
    },
    "id": "5d96d312f2c2423f85f8dc11"
  },
  {
    "title": "Damn itdsdsd",
    "author": "Julia Evans ",
    "url": "https://jvns.ca/blog/2019/09/13/a-year-explaining-computer-things/",
    "likes": 3,
    "user": {
      "username": "congd2v2",
      "name": "Cong Dao",
      "id": "5d902fb6b966c928cb49940e"
    },
    "id": "5d96d348f2c2423f85f8dc12"
  },
  {
    "title": "Damn itdsdsd",
    "author": "Julia Evans ",
    "url": "https://jvns.ca/blog/2019/09/13/a-year-explaining-computer-things/",
    "likes": 3,
    "user": {
      "username": "congd2v2",
      "name": "Cong Dao",
      "id": "5d902fb6b966c928cb49940e"
    },
    "id": "5d96d34bf2c2423f85f8dc13"
  },
  {
    "title": "Taking a year to eplain computer things",
    "author": "Julia Evans",
    "url": "unknown",
    "likes": 0,
    "user": {
      "username": "newuser",
      "name": "Cong Dao",
      "id": "5d903f8689c0283d97cf1976"
    },
    "id": "5d9cde4db08dd9129718479d"
  },
  {
    "title": "This a blog",
    "author": "unknown",
    "url": "unknown",
    "likes": 0,
    "user": {
      "username": "newuser",
      "name": "Cong Dao",
      "id": "5d903f8689c0283d97cf1976"
    },
    "id": "5d9ce10b071137161966aea4"
  },
  {
    "title": "this a image",
    "author": "image",
    "url": "image",
    "likes": 0,
    "user": {
      "username": "newuser",
      "name": "Cong Dao",
      "id": "5d903f8689c0283d97cf1976"
    },
    "id": "5d9ce17717c13f1634cf58ff"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }