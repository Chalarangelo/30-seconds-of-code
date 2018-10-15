### Typescript React Component

To get started with React and Typescript you need to import the React Module.
Next you define your Interface for the Props. Typescript requires that you define the types as well.
After you defined your interfaces you pass them as Type Arguments into the React.Component function call. The first Parameter is for the Props and the second for the State.
As soon as you passed in the Props you are able to display them.

```tsx
import * as React from "react";

interface IProps {
    greeting: string;
}

class TypescriptComponent extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    return <div>{this.props.greeting}</div>;
  }
}

```

```tsx
const htmlNode: HtmlElement = document.getElementById("demoTypescript");
if (htmlNode) {
    ReactDOM.render(<TypescriptComponent greeting="Hello 30 Seconds of Code" />, htmlNode);
}
```

<!-- tags: setup, typescript -->

<!-- expertise: 0 -->
