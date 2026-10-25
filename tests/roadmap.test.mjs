import test from 'node:test';
import assert from 'node:assert/strict';
import {buildRoadmap,goals} from '../lib/roadmap.mjs';
test('limited weekly time extends schedule without dropping phases',()=>{const slow=buildRoadmap({hours:'3'}),fast=buildRoadmap({hours:'10'});assert.ok(slow.totalWeeks>13);assert.ok(slow.totalWeeks>fast.totalWeeks);assert.equal(slow.phases.length,4);for(let i=1;i<4;i++)assert.equal(slow.phases[i].startWeek,slow.phases[i-1].endWeek+1);});
test('experience and specialization change the plan',()=>{assert.ok(buildRoadmap({level:'beginner'}).totalWeeks>buildRoadmap({level:'advanced'}).totalWeeks);for(const goal of Object.keys(goals))assert.equal(buildRoadmap({goal}).phases[2].deliverable,goals[goal].project);assert.notDeepEqual(buildRoadmap({goal:'trainer'}).profile.courses,buildRoadmap({goal:'developer'}).profile.courses);});
test('unknown values fall back to a safe usable plan',()=>{const plan=buildRoadmap({goal:'__proto__',hours:'0',level:'unknown',budget:'invalid'});assert.equal(plan.goal,'architect');assert.equal(plan.weekly,6);assert.equal(plan.budget,'free');assert.ok(Number.isFinite(plan.totalWeeks));});
