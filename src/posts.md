---
layout: posts.liquid
title: Posts
permalink: "/posts/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber | plus: 1 }}/{% endif %}index.html"
pagination:
  data: collections.post
  size: 2
  reverse: true
  alias: posts
---
Lorem ipsum dolar sit amet