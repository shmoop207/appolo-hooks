import {IEventOptions} from "appolo-event-dispatcher";


export interface IEventHook extends IEventOptions{
    parallel?: boolean
}

