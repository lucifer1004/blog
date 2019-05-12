---
templateKey: blog-post
title: '`yarn global` under the hood'
date: 2019-05-12T09:47:23.153Z
description: >-
  `yarn global` helps us manage global npm packages, which is especially useful
  for CLI tools. How does it work?
featuredpost: false
featuredimage: /img/yarnpng.png
tags:
  - javascript
---
![yarn](https://yarnpkg.com/assets/feature-speed.png)

By default, `yarn global` will create a directory at `~/.config/yarn/global` (on OSX and non-root Linux), and if you enter the directory, you will find its structure like this:

```txt
├── node_modules
├── package.json
├── yarn-error.log
└── yarn.lock
```

And in `package.json`, all global packages are defined as `dependencies`, just like  what you are familiar with in a normal JS/TS project.

In this directory, you can do whatever you would normally do, like `yarn add`, `yarn remove`, `yarn upgrade`, `yarn upgrade-interactive`, etc.

The key point that makes `yarn global` different is that it handles the binaries by creating symlinks in the directory you specify with `--prefix` option. On OSX and non-root Linux, the default prefix is `/usr/local`, which means the binaries will be symlinked to `/usr/local/bin`, which is usually in the enviroment variable `$PATH`. So if you prefer using a custom directory for symlinks, do make sure that the directory is in `$PATH`.
