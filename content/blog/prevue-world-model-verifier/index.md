---
title: Building a world model verifier for robotic task verification
date: 2026-08-17
thumbnail: /blog/prevue-world-model-verifier/prevue_demo.gif
excerpt: >-
  PREVUE lets Claude propose a robot skill, imagines the result in a learned visual
  world model, and repairs the plan before the arm moves to ensure that the plan succeeds in the cell. 
clips:
  - src: /blog/prevue-world-model-verifier/prevue_demo.gif
    label: you can see the unverified failure vs verified repair on the same flawed grasp plan
links:
  - label: GitHub
    href: https://github.com/Trolleroof/skill-level-world-model
---

Coding agents, like Claude, are now able to write robot policies. They can look at a scene, solve IK, plan long-horizon tasks, and more. See [Waddle Labs](https://www.waddlelabs.ai/research/introducing-waddle) and [THEA](https://eit-hai.github.io/thea/) for more

What's missing is that there's no way to verify if the trajectory of a plan will successfully execute, or execute in the most efficient manner. Coding agents cannot visualize future action states as well as determine physical consequences. A grasp six centimeters off passes as a proper plan but will clearly fail during execution.

So I built [PREVUE](https://github.com/Trolleroof/skill-level-world-model, a pre-execution visual understanding engine for robot skills.

## The problem with fluent robot plans

If you ask Claude to put a red block on a green pad for a simple pick-and-place task, it can produce a reasonable-looking sequence of waypoints. But a grasp that is centimeters off initially is not inherently revealed in the plan. The only way you can identify this failure is if the arm fails to pick up the red block from its starting point.

PREVUE adds a checkpoint before execution:

1. The user gives a task in plain English.
2. Claude turns it into a structured pick-and-place trace.
3. A learned, action-conditioned world model imagines what that trace will do.
4. A verifier predicts whether the block will lift, reach the target, and succeed.
5. If the plan looks bad, Claude gets fed metrics from the world model (success probability, likely failure, imagined block position) and repairs the plan from that feedback. Only an approved plan is executed in MuJoCo.

## Building the verifier

To start, I generated 5,000 pick-and-place episodes with a wide range of block positions, then recorded camera frames, actions, robot state, and outcomes. This was for our training dataset. 

I then froze a V-JEPA visual encoder, it turns camera frames into a compact scene representation, and trained a small model on top that answers one question: *given this scene and this robot plan, what happens next?* When verifying a plan, the model receives an observation window and the action trace, then imagines about four seconds of motion before predicting whether the skill will succeed.

The outcome head predicts whether the block will be lifted, whether it will end inside the target zone, and whether the whole skill will succeed. I also added in an uncertainty score. 

## Results

For the runs we will discuss later, I purposely told Claude the grasp six centimeters off the red block. The  arm missed, nudged the block, and finished 51 centimeters from the pad.

The world-model verifier imagined the failure with only 7.3% success probability. Claude received the failure explanation, re-aimed the approach and lift waypoints at the observed block centre, and proposed the plan again. The repaired plan scored 94.7% and then placed the block 2.3 centimeters from the pad centre in MuJoCo. This ended up inside of the green pad. 

I repeated the same injected grasp miss across eight scenes. Without any check, the arm never recovered (**0/8**). With verification in the loop, most runs succeeded — but the geometry-only checker, which compares waypoints to estimated block coordinates without ever looking at the image, beat the learned world model by one trial. This was expected as the geometry planner was given oracle positions of the blocks, but regardless showed promise for the world model vision approach. 

| Verifier | Caught bad opening plan | Success rate |
| --- | --- | --- |
| None (unverified) | 0/8 | 0/8 (0%) |
| World-model | 8/8 | 6/8 (75%) |
| Geometry-only | 8/8 | 7/8 (88%) |


## What I learned

Was glad to discover that a coding agent can be given a physical embodiment use a visual model as a verification checkpoint, feed the imagined failure back to an LLM, and improve the plan before execution. 

One limitation was that the model was considerably weak with out of distribution scenarios (i.e. asking it to place the red block on the blue block). This makes sense because the trainind corpus was only for pick and place tasks on the green pad. A block on block placement would be entirely different because the landing zone switches due to blocks inherintly being placed randomly for each unique seed. 