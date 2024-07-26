## MintBos Resources and Documentations

#### Must know info for builders on Mintbos

### Things to read:

- [BOS Docs](https://docs.near.org/bos/overview)

- [NEAR: Anatomy of a Component](https://docs.near.org/bos/api/state)

### Things to watch:

- [Building Anything with Everything](https://www.youtube.com/watch?v=DukrdJtZtSU&list=PLfhNHA8XzVu47dMbIk83W0WE5Krn3uhyG&index=19)

- [Putting Components Inside of Social Posts](https://www.youtube.com/watch?v=YHvUE34WI5A)

## Existing Components

#### Fork, customize, embed, get inspired

- [Social Components Library](https://near.social/mob.near/widget/N.Library)

- [BOS Hacks Component Library](https://www.boshacks.com/#/ndcplug.near/widget/BOSHACKS.Index?tab=resources)

- [NEAR Builders Component Library](https://www.nearbuilders.org/buildhub.near/widget/components.Library) (example using modules)

- [everything.dev](https://everything.dev/) (collection of apps on sidebar)

- [Events Calendar Widget](https://near.social/itexpert120-contra.near/widget/Events)

- [Discover Groups Widget](https://near.social/devs.near/widget/every.group)

## Tools

#### Get your picks and shovels here

- [bos-loader](https://github.com/near/bos-loader/tree/main)

- Serves a local directory of component files as a JSON payload properly formatted to be plugged into a BOS `redirectMap`. When paired with a viewer configured to call out to this loader, it enables local component development—especially when working on multiple components in parallel.

- [bos-cli-rs](https://github.com/bos-cli-rs/bos-cli-rs)

- Component syncing and CI/CD. Ability to download and deploy widgets, as well as make calls to the social contract.

- [bos-component-ts-starter](https://github.com/frol/bos-component-ts-starter/blob/main/README.md)

- Transpiles TSX to JSX using sucrase. Also, automatically returns the `export default function` as BOS component, so you don't need to have a free-standing `return <MyComponent props={props} />` statement at the end of your file.

- [bos-workspace](https://github.com/NEARBuilders/bos-workspace)

- like bos-loader, but more feature-rich. Starts a local gateway, supports Typescript (instead of ts-starter), has hot reload, local widget development in favorite text editor.

### Getting started with bos-workspace

Install [create-bos-app](https://github.com/archetype-org/create-bos-app)

```cmd

pnpm add -g @archetype-org/create-bos-app

```

After installing, run the CLI to start your app, switch to the app directory, and start up the dev environment

```cmd

create-bos-app

cd app

yarn dev

```

Note: bos-workspace has a new version coming out.

Feedback wanted on [bos-workspace v1](https://github.com/NEARBuilders/bos-workspace/pull/51). This will combine `create-bos-app` and `bos-workspace`.
