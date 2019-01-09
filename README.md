# Appolo Hooks Dispatcher
Fast and simple hooks dispatcher for node.js written in typescript.
the fire event method will wait to all event handlers promises to be resolved

## Installation:

```javascript
npm install appolo-hooks --save
```

## Usage:

```javascript
import {EventDispatcher} from "appolo-hooks";
 
class EventHandler extends HooksDispatcher {

}

let eventHandler = new EventHandler();

eventHandler.on("test", async(value)=>{

        //do something async
});

// this will run after the previous handlers is resolved
eventHandler.once("test", (value)=>{
        //do something
});

// will resolved after all handlers are resolved
await eventHandler.fireEvent("test", "some value")


```



## API
#### `on(event,callback,[scope],[options])`
add an event listener
  - `event` - event name.
  - `callback` - callback function that will triggered on event name.
  - `scope` - optional, the scope of the `callback` function default: `this`.
  - options -
    - parallel - if true the handler will run with promise all default false

#### `once(event,[callback],[scope])`
add an event listener will be called only once if  callback passed  a promise will be returned
  - `event` - event name.
  - `callback` - callback function that will triggered on event name.
  - `scope` - optional, the scope of the `callback` function default: `this`.


#### `un(event,callback,[scope])`
remove an event listener. All the arguments must be `===` to the onces used in the `on` method, or else it won\`t be removed.
  - `event` - event name.
  - `callback` - callback function.
  - `scope` - optional, the scope of the callback function.

#### `fireEvent(event,[arguments])`
fireEvent - triggers the callback functions of a given event name
  - `eventName` - name of the event
  - `arguments` -  all other `arguments` will be passed to the `callback` function
#### `removeAllListeners()`
removes all event listeners
#### `removeListenersByScope(scope)`
removes all event listeners by given scope


## License
MIT