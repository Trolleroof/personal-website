---
title: Can object detection make robot policies more robust?
date: 2026-06-30
excerpt: >-
  I built ACT-YOLO to test one focused idea: whether explicit object locations help
  an imitation policy keep working when its camera feed gets noisy, blurry, dark, and compressed.
links:
  - label: X thread
    href: https://x.com/nikhilaprabhu/status/2072014404955336923
  - label: GitHub
    href: https://github.com/Trolleroof/act-yolo
---

This started as my first mini research experiment rather than another open-ended robotics build. I wanted one question I could answer with a controlled comparison: when visual input gets corrupted, does giving an imitation policy an explicit representation of the important objects make it more robust?

I chose a simulated pick-and-place task because it is simple enough to isolate perception, but still unforgiving. The robot has to find a small cube, grasp it, move it across the table, and release it inside a target zone. A few pixels of localization error can become a completely missed grasp.

## The experiment I built

I trained two Action Chunking Transformer policies in the same MuJoCo environment. The baseline received the robot's seven-dimensional joint state plus top and wrist camera images. ACT-YOLO received those exact inputs plus normalized YOLOv8 boxes for the cube and target zone: center, width, height, and confidence for each object.

Everything else stayed matched. Both policies used the same demonstrations, ACT architecture, image augmentation, training schedule, and evaluation scenes. That left one intended difference between them: whether the policy also received an object-centric spatial signal.

For demonstrations, I wrote a numerical-IK waypoint controller that moved through pre-grasp, grasp, lift, carry, and release phases. Each 400-step episode stored both camera views, joint positions, actions, and object boxes. I then trained both policies to predict chunks of 100 future actions instead of choosing only the next action one step at a time.

## Making the detector part of the experiment

I generated 5,000 detector images directly from MuJoCo. Segmentation renders gave me exact masks for the cube and target zone, which I converted into YOLO labels automatically. That avoided a manual labeling pass and kept the detector data tied to the same geometry as the task.

My first detector looked strong on clean validation images and then collapsed on the small cube once I corrupted the camera feed. At medium and high corruption, cube recall fell to 0.17 and 0.03. The policy could not benefit from object guidance if the guidance disappeared exactly when vision became difficult.

The fix was to train YOLO with the same corruption family used at evaluation: Gaussian noise, blur, brightness and contrast shifts, and JPEG compression. With the training data and epoch count held fixed, corruption augmentation raised cube recall at medium severity from 0.17 to 1.00 and at high severity from 0.03 to 0.98 in the controlled detector check.

I also added box jitter and dropout while training ACT-YOLO. Feeding perfect boxes during training and imperfect detections during evaluation would have created another hidden distribution shift. The policy needed to learn that a detector output is useful evidence, not ground truth.

## Keeping the comparison fair

A weak baseline would make the idea look better than it was, so both ACT policies saw identical image corruption during training. During evaluation, both faced the same 50 scene seeds at each of four corruption levels. I compared paired successes with McNemar's test and reported Wilson confidence intervals instead of treating a few lucky rollouts as a conclusion.

That paired design mattered. Without it, a policy could get easier cube positions by chance and I might mistake scene variation for a model improvement. Matching the rollouts made each result a direct baseline-versus-guided comparison on the same task instance.

## What happened

ACT-YOLO beat the baseline at every tested severity: 12% versus 4% on clean images, 6% versus 4% at low corruption, 14% versus 6% at medium corruption, and 18% versus 4% at high corruption. The largest gap was at the highest severity, where the guided policy completed 9 of 50 rollouts and the baseline completed 2 of 50. That 14-point difference was the only statistically significant result, with p = 0.0391.

The honest interpretation is narrower than "object detection solves robust manipulation." The baseline was already near the floor, and ACT-YOLO still failed most rollouts. The experiment gives evidence that explicit object locations can help under severe visual corruption, but it does not yet show a strong manipulation policy or prove that the same gain transfers to a real robot.

## What I would change next

The next useful run is not a bigger model by default. I would first lift the clean-task success rate so corruption has more performance to degrade, then repeat the paired sweep across more seeds. I would also add a ground-truth-box policy to separate the value of object-centric state from the errors introduced by YOLO.

What I liked about this project was the research loop: state one falsifiable question, find the confounders, build gates before expensive training, and keep the final claim no larger than the evidence. The most valuable implementation work was not adding another network. It was making sure the comparison actually measured the idea I cared about.
