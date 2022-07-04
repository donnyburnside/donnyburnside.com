---
layout: tag.liquid
title: Tag
permalink: "/posts/tags/{{ tag | slugify }}/index.html"
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - all
    - nav
    - post
    - posts
    - tagList
  addAllPagesToCollections: true
eleventyComputed:
  title: Tagged “{{ tag }}”
---
Lorem ipsum dolar sit amet