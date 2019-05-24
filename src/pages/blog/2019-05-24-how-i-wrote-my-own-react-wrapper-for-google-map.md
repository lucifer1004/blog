---
templateKey: blog-post
title: How I wrote my own React wrapper for Google Map
date: 2019-05-24T09:34:57.358Z
description: How I wrote my own React wrapper (@googlemap-react/core) for Google Map
featuredpost: true
featuredimage: /img/map.jpg
tags:
  - JavaScript
---
![A map](https://images.unsplash.com/photo-1451988336904-b1a6e8846746?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60)

A few months ago, when I started the Neighborhood Map project of Udacity, I first checked the libraries available. There were quite a few choices:

- [tomchentw/react-google-maps](https://github.com/tomchentw/react-google-maps)
- [google-map-react/google-map-react](https://github.com/google-map-react/google-map-react)
- [fullstackreact/google-maps-react](https://github.com/fullstackreact/google-maps-react)

However, none of them could meet my requirements (it was also possible that I did not figure out the proper way to deal with the problems). I want the components to be flexible, e.g., the `Marker` component does not necessarily to be placed within a `Map` component. This flexibility is essential when designing the layouts, and also when structuring components so as not to trigger unnecessary rerender.

What they provide (generally):

```javascript
<Map>
    <Marker />
    <InfoWindow />
</Map>
```

What I want:

```javascript
<Map />
<ComponentA>
    <Marker />
    <ComponentB>
        <InfoWindow />
    </ComponentB>
</ComponentA>

```

The idea came into my mind that I could write my own React wrapper for Google Map. This sounded a bit audacious because I had never written a React component library before. As the deadline of the Udacity project came closer and closer, I finally made up my mind to write my own Google Map library, with React hooks and TypeScript, and TDD.

Although I had not written a React component library, I had written a very simple Vue component library (following instructions of a blog). I had been writing TypeScript for several months, and had written a React app with context and hooks. And I had used TDD in several projects. These experiences gave me confidence.

Yet challenges did come, one after another. I had written some tests, but I had not written library mocks. I managed to mock `loadjs`, which I used to load Google Map scripts.

Another problem was that hooks live with functional components, and functional components do not have instances. Other Google Map libraries all use class components, and implement methods for class instances to surrogate Google Map objects' methods. But I could not do so. In the end, I chose to maintain an id-object Map to store references to all Google Map objects. It worked fluently, and could be used without using React `ref` (class instances rely on `ref`). The only price was that things like `Marker`, `Polygon` would require a unique `id` when using my library.

At first, I just thought about my own needs, and the API design was way too casual (you can check [my original repo](https://github.com/lucifer1004/react-google-map) and time-travel to earlier versions). Later, my personal project was finished, but I knew a lot of things were still up in the air.

{% github lucifer1004/boycott %}

It is a simple React app, using Google Map and Yelp to implement basic place search.

![Screenshot from Boycott](https://github.com/googlemap-react/googlemap-react/raw/master/images/boycott.png)

After submitting the project at Udacity, I went on with my library. For my personal project's needs, I only implemented `MapBox`, `Marker`, `InfoWindow`, `HeatMap` and `Polygon`. There were around 20 more Google Map components.

It happened several times that I had to refactor the whole library when trying to implement a new component. Luckily, I wrote unit tests for each component, and those tests helped a lot during refactors.

I spent about two weeks' spare time implementing:

- other shapes: Circle, Polyline, Rectangle
- layers: BicycleLayer, TrafficLayer, TransitLayer
- search: SearchBox, StandaloneSearchBox
- streetview: StreetView, StandaloneStreetView
- overlays: CustomControl, GroundOverlay, KmlLayer, OverlayView
- drawing: DrawingManager

The library started from `create-react-app`, I used a separate `package.json` in `src/lib` to configure the library, while the app was configured by the root level `package.json`. As the library grew, I felt I should set up a monorepo properly.

The week of refactoring project structure was rather tough. I read many blogs and posts on monorepos, but still could not get everything work as I hoped. I gave up once, and nearly gave up again the second time, and I made it.

With `lerna` and `yarn workspaces`, and a custom symlink，I was finally pleased with the new structure. By running `yarn dev:lib` and `yarn dev:CRA` at the same time, the example CRA app would reload each time I changed the code of the library.

I really appreciate that I decided to write my own wrapper library a month ago, otherwise I would not have learnt so much (I am going to write more posts in the series to talk about things I have learnt in detail). And I will try to further improve my library. It has not been tested in real projects. Compared to existing libraries, some functions are missing. Also there are some known issues, or limitations.

I am prepared.

---

Recently, I moved this project to a separate organization. Below is the repo.

[![logo of @googlemap-react](https://avatars1.githubusercontent.com/u/47935106?s=200&v=4)](https://github.com/lucifer1004/googlemap-react/googlemap-react)

Any advice or suggestions are welcome! If you want to use my library and run into any problem, just ask me!

If you want to join, that would be great!
