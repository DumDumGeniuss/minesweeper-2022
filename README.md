# Minesweeper 2022

Minesweeper 2022 is a minesweeper game built in 2022, ummm... yeah, literally.

This repository is initialized with [dumdum-next-boilerplate-2022](https://github.com/DumDumGeniuss/dumdum-next-boilerplate-2022).

![Vercel](https://vercelbadge.vercel.app/api/DumDumGeniuss/dumdum-next-boilerplate-2022)

## Demo

The app is deployed here:

[https://minesweeper-2022-dumdumgenius.vercel.app/](https://minesweeper-2022-dumdumgenius.vercel.app/)

## TODO

RWD is not yet supported, we will be working on it soon.

## Design Principles

### Write Clean Code

[Clean Code Summary](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29)

### Conform to SOLID Principles

[SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## Infrastructure

We have two main modules that build the entire Minesweeper game:

### 1. Minesweeper Class

This is a **"class"** that encapsulates everything you need in a Minesweeper game, with its simple API, you as a user are allowed to focus on building UI without bothering with complex logic of the game.

Check here for details [Minesweeper Class](https://github.com/DumDumGeniuss/minesweeper-2022/blob/main/src/lib/minesweeper/README.md).

### 2. MinesweeperBox

This is a React component in charge of rending the UI for users to interact with a Minesweeper game, with the help of Minesweeper class, this component was built with super low complexity thanks to Minesweeper class :).

Check here for details [MinesweeperBox](https://github.com/DumDumGeniuss/minesweeper-2022/blob/main/src/components/MinesweeperBox/README.md).

### Diagram

![Diagram](https://github.com/DumDumGeniuss/minesweeper-2022/blob/main/doc/diagram.jpg)

## Commands

### Installation

```bash
yarn
```

### Development

```bash
yarn dev
```

### Building Assets

Run this command to build bundles.

```bash
yarn build
```

### Hosting Dynamic Content (Server-Side Rendering)

```bash
yarn start
```

### Building Tests

```bash
yarn test:watch
```

### Sytle Checks

```bash
yarn lint
```

### Pre Commit Hook

Please make .husky/pre-commit executable

```bash
chmod +x .husky/pre-commit
```
