export const goals: Record<string,{label:string;courses:string[];project:string;focus:string}>;
export function buildRoadmap(input?:{goal?:string;level?:string;hours?:string;budget?:string}):{goal:string;profile:typeof goals[string];level:string;weekly:number;totalWeeks:number;budget:string;phases:{title:string;hours:number;task:string;deliverable:string;startWeek:number;endWeek:number}[]};
