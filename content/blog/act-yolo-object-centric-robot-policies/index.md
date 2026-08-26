---
title: Can object detection make robot policies more robust?
date: 2026-06-30
thumbnail: /blog/act-yolo/thumbnail.gif
excerpt: >-
  I built ACT-YOLO to test one focused idea: whether explicit object locations help
  an imitation policy keep working when its camera feed gets noisy, blurry, dark, and compressed.
clips:
  - src: /blog/act-yolo/thumbnail.gif
    label: YOLO-guided ACT — detections under high visual corruption (severity 3)
links:
  - label: GitHub
    href: https://github.com/Trolleroof/act-yolo
---

I just worked on my first mini experiment, which I am dubbing ACT-YOLO. I want to know if visual input gets corrupted for policies like ACT, does giving an imitation policy an explicit representation of the object make it more robust?

I chose a simulated pick-and-place task because it is simple enough to isolate perception. The robot has to find a small cube, grasp it, move it across the table, and release it inside a target zone. A few pixels of localization error can become a completely missed grasp. I also was motivated to reimplement the ACT paper, and add my own twist to it. 

Decuded to simuilate a pick-and-place task because it is simple enough for a perception task. The robot has to find a small cube, grasp it, move it across the table, and release it inside the target zone. A few pixels of error can result in a missed grasp.


## The experiment I built

I trained two Action Chunking Transformer policies in the same MuJoCo environment. The baseline got the robot's 7 DoF's joint state + top and wrist camera images. ACT-YOLO received those exact inputs plus normalized YOLObounding boxes for the cube and target zone.

I kept everything else matched on purpose. I had setup the same demo recordings, same ACT setup, same image augmentation, same training, and same test scenes. The only thing I changed was whether the policy also got box coordinates for where the cube and target zone are. The baseline did not recieve it and ACT-YOLO did.

For demonstrations, I wrote a numerical-IK waypoint controller that moved through pre-grasp, grasp, lift, carry, and release. Each 400-step episode kept track of both camera views, joint positions, actions, and object boxes. I then trained both policies to predict chunks of 100 future actions just like the ACT paper. 

## Making the detector part of the experiment

I generated 5,000 detector images directly from MuJoCo. Segmentation renders gave me exact masks for the cube and target zone, which I converted into YOLO labels automatically. That avoided manual labeling and kept the detector data tied to the task.


My first detector looked strong on clean validation images and then sucked on the small cube when I corrupted camera feed. At medium and high corruption, cube recall fell to 0.17 and 0.03. The policy didn't improve from object guidance if the guidance disappeared when vision became difficult.

The fix was to train YOLO with the same corruption used during evaluations. This means using Gaussian noise, blur, brightness and contrast shifts, and compression. With the training data, corruption raised cube recall at medium severity from 0.17 to 1.00 and at high severity from 0.03 to 0.98.

I also made bounding boxes jitter while training 
ACT-YOLO. Feeding perfect boxes during training 
and imperfect detections during evaluation would 
have created another hidden distribution shift. 
The policy needed to learn that a detector 
output is useful evidence, not ground truth.

I also shook up the bounding boxes while training ACT-YOLO. If training always used perfect boxes but testing used messy YOLO detections, the policy would learn wrongly, so had to make that fix. 


## What happened

Both policies trained on the same corrupted images. At test time, both ran on the same 50 scenes at all four corruption levels.

ACT-YOLO beat the baseline at every tested severity: 12% versus 4% on clean images, 6% versus 4% at low corruption, 14% versus 6% at medium corruption, and 18% versus 4% at high corruption. The largest gap was at the highest severity, where the guided policy completed 9 of 50 rollouts and the baseline completed 2 of 50. That difference was the only statistically significant result (p = 0.0391).

The experiment is evidence that explicit object locations can assist policies under severe visual corruption, but it does not yet show a strong manipulation policy or prove that the same gain transfers to a real robot outside of sim.

![Robustness curve: ACT baseline vs YOLO-guided ACT](/blog/act-yolo/robustness-curve.png)

*Success rate vs corruption severity: ACT baseline vs YOLO-guided ACT (50 rollouts/cell, p=0.039 at high).*

