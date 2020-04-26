# NgRx
Every Angular application needs to manage state. As an application gets larger, it must manage more and more state. Keeping track of that state can be challenging, especially as more components must react to state changes. We often end up with fragile interactions and hard to find bugs, making it difficult to add more features and more state.

## What is state?
<p align="center">
  <img src="imgs-notes/1.png" alt="State">
</p>

## Purpose of NgRx
The purpose of NgRx is to provide a formal pattern for organizing our application's state into one single, local state container, managing that state by requiring a one-way data flow, and communicating state changes to our components so they can react accordingly.

## What is NgRx?
NgRx is the popular state management pattern called Redux tailored to Angular using standard Angular concepts and techniques.
<p align="center">
  <img src="imgs-notes/2.png" alt="ngrx">
</p>

## Why use NgRx?
With NgRx we don't need a service for each bit of state, rather we have a single store for our application state, making it easy to find, track, and retrieve state values.

## Use NgRx when...
### There is lots of state and little services.
The store provides a convenient place to put UI state to retain it between router views.
### There are excessive HTTP requests.
The store provides a client-side cache our application can use as needed.
### There are complex component interactions.
The reducer updates the store and the store notifies all subscribers, keeping the components decoupled, yet communicating. Using NRx in this scenario can prevent race conditions and issues caused when multiple components are updating data.
### Something isn't working
It has great tooling to help us see our actions and state. Using NgRx gives us a standard pattern that can help large or complex projects and larger teams with these issues. But NgRx is not for every project.

## Don't use NgRx when...
* Your team are new to Angular, wrap up with Angular and RxJS Observables first. You'll be much more successful with NgRx once you've mastered Angular.
* If the application is simple, the extra code required for NgRx may not be worth the effort for a simple application.
* If you and your team already have a good state management pattern in place for your applications.

## The Redux Pattern
 Patterns bring order to chaos, and the Redux pattern is no different. Redux is a way to implement a predictable state container for JavaScript apps. Redux the library, which was the first to implement the Redux pattern, was based on Facebook's Flux library, and in the last few years has become the dominant state management pattern for single-page applications. The Redux pattern, which NgRx is based on, has three main principles.

 > There is only one single source of truth for application state called the store.

 > State is ready-only and the only way to change state is to dispatch an action.

 > Changes to the store are made using pure functions called reducers.

### Store
The store is literally a JavaScript object that holds all of your application state. You can think of it as a client-side database. With Angular, you may be building services to hold your application state. Following the Redux pattern, all of this state instead is retained in the store. This becomes very powerful when it comes to reasoning about user interaction, debugging, performances, and avoiding race conditions in general. The store is runtime only, so the state is not retained if the user refreshes the page or after the user exits the application.

The state is much easier to manage if it is arranged into a logical structure. Because Angular applications are often organized into feature modules, it makes sense to layout the state by feature as well. This creates a tree-like hierarchy of properties. Each feature state is added to the application state once the feature is loaded, resulting in a single state tree. These pieces of state are sometimes called slices. So we have the products slice, users slice, and so on.
<p align="center">
  <img src="imgs-notes/3.png" alt="store">
</p>

#### Do you have to put every piece of state in the store? What shouldn't go in the store?
* Unshared state that is solely owned by a single component that does not need to be shared or made available across routes.
* Angular forms also don't belong in the store as they are usually self contained and do not need to be shared across multiple components. Also, Angular forms are not serializable or immutable and can change themselves, meaning you will not be able to track those changes with actions, which is the second principle of Redux, that to change state you need to dispatch actions.
* State that has cycles in it or has complex data structures that cannot be serialized should not be put into the store.

#### Tips
* We have one store for all of the state.
* We'll organize our state by feature to match with our feature modules. To create this state, we define multiple reducers, one for each feature's slice of state.
* State is never created for a module that is not loaded.
<p align="center">
  <img src="imgs-notes/4.png" alt="tips">
</p>

#### Feature Module State Composition
This allows us to compose our application state from our feature module reducers. To use feature module state composition, we begin by initializing our root application state in the root AppModule. We pass to the forRoot method, the reducer that creates our root application state. We then initialize each features state using the StoreModule forFeature method. The forFeature method takes in the name of the feature slice, which is often the plural form of our feature. The second argument is a reference to the reducer that manages that feature's slice of state. We repeat this code in each feature module that uses the store.
<p align="center">
  <img src="imgs-notes/5.png" alt="fmsc">
</p>

#### How to access a value in the store?
We have to select the appropiate slice of state.
```typescript
this.store.select('products');
// OR
this.store.pipe(select('products')).subscribe(products => {
  ...
});
```
<p align="center">
  <img src="imgs-notes/6.png" alt="store">
</p>
<p align="center">
  <img src="imgs-notes/10.png" alt="store">
</p>

### Actions
All relevant user events are dispatched as actions, effecting reducers who update the store.
#### Examples
* Login action after a login form submission.
* Toggle side menu action after clicking a button.
* Retrieve data action when initializing a component.

Actions are basically simple JavaScript objects with a type as a string and an optional payload that can be of any type.
```javascript
{
  type: 'LOGIN',
  payload: {
    username: 'Cristian',
    password: 'secret'
  }
}
```
When we say the store is read-only and that to change state we dispatch actions, we mean you shouldn't mutate the state and you should follow the principle of immutability, meaning that if you need to change the state of the store, then replace the whole state object and not just mutate part of it. Immutability can bring increased performance to your apps and lead to simpler programming and debugging as data that never changes is much easier to reason about then data that is free to be changed arbitrarily throughout your app.

<p align="center">
  <img src="imgs-notes/7.png" alt="actions">
</p>
<p align="center">
  <img src="imgs-notes/9.png" alt="actions">
</p>

### Reducers
Reducers are functions that specify how state changes in response to an action. It is called whenever an action is dispatched.
#### Examples
* Set a userDetails state properly on login.
* Toggle a sideMenuVisible state property to true on a button click.
* Set successfully retrieved data on a component initialization.
* Set a globalSpinnerVisible property to true while saving data.

Not all dispatched actions can directly update the store via a reducer as some actions have **side effects**.
A reducer is a pure function, accepting two arguments. The previous state and an action dispatched to update state. Reducers use switch statements to listen and act on specific action types, taking the actions payload and state and returning new state. For each action, the reducer creates a new representation of the state and returns that new state to the store, replacing any prior state.
```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_USER':
      return { users: [...state.users, action.payload] };
  }
}
```
#### What is a pure function?
A pure function is a function, given the same arguments, will always return the same value with no observable side effects. So pure functions will always return consistent results, but also pure functions will not mutate or access properties outside of their function scope.

<p align="center">
  <img src="imgs-notes/8.png" alt="reducer">
</p>

### Diagram
<p align="center">
  <img src="imgs-notes/11.png" alt="diagram">
</p>

### Advantages of the Redux Pattern
* Centralized immutable state making it easier to track down problems. Using pure functions to change state allows features in Redux, like time travel debugging, record replay, and hot reloading. It also makes it easy to hydrate your application's state from local storage or when doing server-side rendering.
* Redux makes it easier to implement an Angular change detection strategy in your components called OnPush, which can improve your view performance.
* Makes writing unit tests easier. All of your state changes go through pure functions, which are much simpler to test.
* Tooling is another huge benefit of using the Redux pattern, as Redux makes it possible to have a history of state changes.
* Component communication. NgRx makes it easier to access to shared state via injecting the store into a component versus passing data between components.

> "Redux is not great for making simple things quickly. It's great for making really hard things simple."

## Redux Devtools
1. Download the Redux Devtools Extension.
2.
```bash
npm install @ngrx/store-devtools
```
3. In your AppModule add instrumentation to the module imports using StoreDevtoolsModule.instrument:
```typescript
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
})
export class AppModule {}
```

## Defining Interfaces for Slices of State
For each slice of state we define an interface that describes the structure of that state. Then we pull it together to compose the global application state from each feature slice of state. This interface then defines our entire state tree, referencing each of the feature interfaces for detailed properties.
<p align="center">
  <img src="imgs-notes/12.png" alt="interfaces">
</p>

## Extending the State Interface for Lazy Loaded Features
When we set up a feature module for lazy loading, that module is independently bundled, and when the user accesses the application, it is downloaded from the server separate from our main application bundle, after the first page of the application is displayed. This improves our application's startup performance.
### So what does lazy loading have to do with our state interface?
We want to establish logical boundaries around our lazy loaded features. To maintain that boundary, we want to keep our lazy loaded feature areas completely separate from our initial bundled code. By directly importing the product state interface here, we break through that boundary.
<p align="center">
  <img src="imgs-notes/13.png" alt="Lazy Load">
</p>

In this example, we'll instead define the interface only for the users slice of state, since it isn't lazy loaded. Then in the products feature code, we'll extend that definition of our global application state to include the product state. Since this code is part of the products feature, we keep it within our lazy loading boundary. Here we define a state interface that extends our global application state interface using the extends keyword. Instead of importing each individual interface from our app. state file, we import *, which imports all of the exported members. Extending the global application state results in a state interface that looks just like our original, but is defined to keep our lazy loading boundary intact. As we add features, if they aren't lazy loaded we'll add them to this state interface. Otherwise we'll use this technique and the associated feature to extend the state interface.

## Set Initial Values
Since one of the goals of using NgRx is to make our application more predictable, we should explicitly define initial values for each bit of state so that it is not undefined. One way to initialize our state is to define an object and set an initial value for each bit of state. To ensure the initial value is never changed, we declare it as a constant.
<p align="center">
  <img src="imgs-notes/14.png" alt="Initial State">
</p>
Here we define a constant named initialState and strongly type it using our ProductState interface. We then specify an initial value for each property. To assign this initial state, we take advantage of JavaScript's default functional parameter syntax. This syntax allows us to initialize a function parameter with a default value. Now when the store is initialized and the reducer is first called, these initial values are assigned and our store is never undefined.

## Selectors
So far our components subscribe to the store, selecting the entire products slice of state. There are a few issues with this approach.
1. Hardcoded string here that leaves us open to typographical and misspelling errors.
2. Explicitly retrieve a property from the store, making assumptions about the store structure. That means if we ever change the structure of our store, reorganizing it into sub-slices, we have to find every select and update its code.
3. Watches for changes to any property in the slice of state.

A selector is a reusable query of our store. It is basically like a stored procedure for accessing our in-memory state information. Selectors allow us to keep one copy of the state in the store, but project it into different shapes, making it easier to access by our components and services. Our components use the selector to select state from our store, adding a level of abstraction between our stores structure and our component.

### Benefits to using Selectors
<p align="center">
  <img src="imgs-notes/15.png" alt="Selectors">
</p>
1. They provide a strongly typed API for the components to use. We don't have to refer to slices of state with hard coded strings.
2. They decouple the store from the components so the components don't need to know about the structure of the store. This allows us to reorganize or split up the state differently over time without updating every component that accesses it.
3. Selectors can encapsulate complex data transformations, making it easier for the components to obtain complex data.
4. They are reusable, so any component can access the same bit of state the same way.
5. Selectors are memoized, that's a fancy word meaning that the selectors returned value is cached and won't be reevaluated unless the state changes. This can improve performance.

### What is a Selector?
It is a function that drills into the store and returns a specific bit of state. There are two basic types of selector functions provided by the NgRx library (Both required).

The first type is a **createFeatureSelector**. This function allows us to get the feature slice of state simply by specifying its feature name. We strongly type the return value using the generic argument. Here we specify our products slice of state and assign this function to a constant. When executed, it selects the specific feature slice of state. We don't export this constant so it can only be used where it is defined.

The second type of selector function is a **createSelector**. This function allows us to get any bit of state by composing selectors to navigate down the state tree. Here we pass the feature selector function in as the first argument to this selector. The last argument is a projector function that takes in the state returned from the prior arguments, which in this case is the products slice. We can then filter, map, or otherwise process the state to return the desired value. We assign this function to an exported constant so we can use the selector from our components. By using selectors in our components, if our stores structure ever changes, we can modify these selectors to access that new structure without changing any of the components that use them.
<p align="center">
  <img src="imgs-notes/16.png" alt="Selectors Types">
</p>

One important thing to note here, a selector should be a pure function. That is to say that given the same input, the function should always return the same output with no side effects.

<p align="center">
  <img src="imgs-notes/17.png" alt="Summary">
</p>

### Composing Selectors
<p align="center">
  <img src="imgs-notes/18.png" alt="Composing Selectors">
</p>

## Actions Creators
There are several ways to strongly type our actions, including action factory functions. But we'll take advantage of the extra type safety and build action creators. Strongly typing actions using action creators involves three steps:
1. Define the action types as a set of named constants.
2. Build the action creators.
3. Define a union type for those action creators.

### Benefits of Strongly Typed Actions
1. Strong typing helps prevent hard to find errors from misspellings or typos.
2. Strong typing improves the tooling experience, making it easy to see the list of actions and select the appropriate action for a given purpose, and it results in a well-defined set of valid actions that the application can perform.
3. This provides a level of documentation on what the application can do. So strong typing help us define a clear and clean set of actions that the tooling uses to help us better use those actions.

### Defining Action Types
Since action types are strings, we can define the set of valid action types using an enum. Using enums makes it easy to document intent, which is exactly what we want for our actions. This enum will ultimately provide the comprehensive list of all actions that can be performed against the product feature state. We could name it anything, but by convention we'll name it based on our feature, ProductActionTypes. We then clearly name each action type with an enum constant. The action constant name often begins with an action verb, such as **toggle, set, clear, initialize, or load**. We assign each action type name to an appropriate string.
```typescript
export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',
}
```
Here we begin each action string with the name of the slice of state that is effected by the action, then we specify the action type name, but with spaces to make it readily readable. You and your team may want to get more specific with these strings, including the name of the page or API that dispatches the action. You and your team may want to get more specific with these strings, including the name of the page or API that dispatches the action. That provides a better context of the event source and can make it even easier to use the DevTools to examine where the actions were dispatched.

### Building Actions Creators
The next step is to build an action creator for each action. An action creator expresses an action as a simple class with two properties, a type and a payload. It's called an **Action Creator** because we use it to literally create the actions we dispatch. Expressing actions as classes makes it possible to strongly type the actions when we dispatch and process them in the application.
 ```typescript
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean){ }
}
```
By convention, we name the class the same name as the action type constant defined in the enum. To define the class as an action, we implement the Action interface provided by the NgRx store. Then we declare the two properties. We define the type property as readonly so it is never changed. We assign it to the associated enum constant. We define the payload property in the constructor. By specifying the accessibility here in the constructor, we take advantage of a TypeScript shortcut that declares a property and assigns that property in the constructor.

### Defining a Union Type for the Action Creators
The last step to strongly typing our actions is to define a type that unions all of the action creator classes. We do this so we can limit the possible actions to only those defined by one of these creator classes. To expose this union type to the other parts of the application, we export it. Then we give it a name based on our feature. We assign it to the union of our action creator classes, using the pipe character to union the classes into one consolidated type, one type to rule them all.
```typescript
export type ProductActions = ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct;
```

### Defining Actions for Complex Operations
<p align="center">
  <img src="imgs-notes/19.png" alt="Complex Operations">
</p>