/**
 * Author: xfoxawy@gmail.com
 */

/**
 * EventBus Pub/sub Mediator Module
 */
var EventBus = function(){
    var __ = {};
    this.channels = [];
    this.channel_subscribers = [];
    this.events_subscribers = [];
};

/**
 * [pushEvent description]
 * @param  {[type]} channel [description]
 * @param  {[type]} event   [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
EventBus.prototype.pushEvent = function(channel, event, data){

        if(!this.channels[channel]) this.channels[channel] = {};
        
        this.channels[channel][event] = {
            data : data
        };

        if(
            this.channel_subscribers[channel] 
            &&this.channel_subscribers[channel].length
        ){
            this.channel_subscribers[channel].forEach(function(cb){
                cb(event, data);
            });
        }

        if(
            this.events_subscribers[channel] 
            &&this.events_subscribers[channel][event] 
            &&this.events_subscribers[channel][event].length
        ){
            this.events_subscribers[channel][event].forEach(function(cb){
                cb(event, data);
            });
        }
};

EventBus.prototype.subscribeToAll = function(listner) {
    let channels = Object.keys(this.channels);
    
    for(var i = 0; i < channels.length; i++){
        if(!this.channel_subscribers[channels[i]]) this.channel_subscribers[channels[i]] = [];
        this.channel_subscribers[channels[i]].push(listner);
    }
};

/**
 * [subscribeToChannel description]
 * @param  {[type]} channel [description]
 * @param  {[type]} listner [description]
 * @return {[type]}         [description]
 */
EventBus.prototype.subscribeToChannel = function(channel, listner){
    if(typeof listner !== 'function') throw new Error('can\'t register uncallable');
    if(channel === "*") this.subscribeToAll(listner);
    if(!this.channel_subscribers[channel]) this.channel_subscribers[channel] = [];
    this.channel_subscribers[channel].push(listner);

    // send old events
    if(
        this.channels[channel] 
        &&Object.keys(this.channels[channel]).length
    ){
        var keys = Object.keys(this.channels[channel]);
        for(var i = 0; i < keys.length; i++){
            listner(keys[i], this.channels[channel][keys[i]].data);
        }
    }
};

/**
 * [subscribeToEvent description]
 * @param  {[type]} channel [description]
 * @param  {[type]} event   [description]
 * @param  {[type]} listner [description]
 * @return {[type]}         [description]
 */
EventBus.prototype.subscribeToEvent = function(channel, event, listner){
    if(typeof listner !== 'function') throw new Error('can\'t register uncallable');
    if(!this.events_subscribers[channel]) this.events_subscribers[channel] = [];
    if(!this.events_subscribers[channel][event]) this.events_subscribers[channel][event] = [];
    this.events_subscribers[channel][event].push(listner);

    // send old events
    if(
        this.channels[channel] 
        &&this.channels[channel][event]
        &&Object.keys(this.channels[channel][event]).length
    ){
        listner(event, this.channels[channel][event].data);
    }
};

module.exports = EventBus;