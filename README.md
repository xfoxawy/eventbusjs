## SimpleEventBusJs
Simple Pub/Sub Event Bus as mediator pattern, it can be used as mediator module to communicate between different modules, its easy to use.
Inspired by Laravel EventBus

### Installation

    npm install simpleeventbusjs

### Usage

 

 - Import `var EventBus = require('simpleeventbusjs');`
 - create new instance `let eb = new EventBus();`
 - Subscribe to a channel `eb.subscribeToChannel('test_channel', my_cb)`
 - Subscribe to specific event on a channel `eb.subscribeToEvent('test_channel', 'test_event', my_cb)`
 - Subscribe to all events from all channels `eb.subscribeToChannel('*', my_cb)`.
 - Push events  `eb.pushEvent('test_channel', 'test_event', {data : 'success'})` and it will automatically invoke subscribed callbacks.
 - 
