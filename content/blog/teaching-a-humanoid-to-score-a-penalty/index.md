---
title: How I taught a humanoid to score a penalty kick
date: 2026-08-12
excerpt: >-
  A human kick only moved the ball 3.7 meters after I retargeted it to a Unitree G1.
  Here is how pelvis-local motion mapping, a differentiable warm start, and MuJoCo search
  turned it into accurate shots to either corner.
clips:
  - src: /blog/humanoid-penalty/source-motion.mp4
    label: 1 / Human source motion
  - src: /blog/humanoid-penalty/behind-goal.mp4
    label: 2 / ball crossing, behind goal view
  - src: /blog/humanoid-penalty/kick-follow-through.mp4
    label: 3 / Close replay & follow through
links:
  - label: X thread
    href: https://x.com/nikhilaprabhu/status/2077099481288651133
  - label: GitHub
    href: https://github.com/Trolleroof/egogoal-amd-hackathon
---

Was recently watching the World Cup and naturally wondered if we could get humanoids to attempt to play soccer. Locomotion policies have been progressing and Unitree G1s were the best form factor we've put out into the public to date. So why not try to get them to replicate the best players on the world's stage?

I wanted to start with the simplest version of that idea: a penalty kick. If we could retarget motion from a real person onto a G1 in sim, then teach it to kick toward a target while avoiding a goalie, that felt like a useful first step.

The first version looked like a kick but did not behave like one. With realistic turf friction in MuJoCo, the ball stopped after 3.7 meters while the goal was 10.5 meters away — a complete failure, but the one that made the problem clear. Copying human pose data was not going to be enough. The clips above show where it ended up.

## Turning human motion into robot motion

I started with penalty kick clips from the SoccerKicks dataset and its per-frame 3D HMMR joint annotations — about as good as input data gets. A direct joint-angle copy would not work because a human and a G1 have different proportions, joint limits, mass distribution, and zero-pose conventions.

Instead, I built a coordinate frame around the person's pelvis for each frame. The hip line and the neck-to-hip direction define local down, left, and forward axes. From there I measured limb vectors relative to the person's own orientation, converted them into hip, knee, ankle, shoulder, elbow, and waist angles, and expressed the delta from the initial standing pose.

That pelvis-local representation removed the camera angle from the problem. I also clamped every joint to the G1's limb range so a noisy pose estimate could not create impossible scenarios.

## Why the retargeted kick still failed

Retargeting got the G1 into motion that looked like a kick. What it could not do was generate foot speed, transfer force through contact, or stay upright while doing it — imitation alone was not enough.

I only noticed the gap once I gave the virtual pitch real friction. Before that, weak kicks let the ball roll forever and hide the problem. With friction on, the ball stopped around 4 meters and I had to rethink the approach.

## A hybrid optimizer instead of one giant training run

MuJoCo's rigid-body contacts are not something you can simply backprop through, so I split the problem in two.

**Step 1** used a small PyTorch proxy so I could run gradients through it and search quickly. It guessed the rough shape of the kick — backswing timing, strike timing, small joint tweaks — in about 400 Adam steps, under a second on an MI300X. It only suggests kicks; it never decides if they work.

**Step 2** ran Cross-Entropy Method (CEM) search in the full simulator. Each try adjusted a small control set:

- right hip, knee, ankle at three moments around contact
- how hard the plant leg braces
- playback speed
- pelvis rotation

48 candidates per round, 12 rounds. Keep the best, sample around them, repeat.

A good kick meant the ball crossed the goal line near the target with enough speed to matter, with a small penalty if the motion drifted too far from the human kick. Faster than training a full policy from scratch — and MuJoCo physics always got the final vote.

After contact, I blended all 29 joints back to a neutral stand. Otherwise the G1 just faceplanted.

## The shots that came out

The untuned motion topped out around 2.1 m/s and stopped at 3.7 meters.

The optimized left-corner kick reached 7.32 m/s and crossed 0.01 meters from its target. The center shot hit 9.94 m/s and crossed essentially dead on. The right-corner shot reached 5.92 m/s and also finished 0.01 meters from target. All three came from MuJoCo rollouts in sim.

## Making an interactive demo

Since this was for a hackathon, I wanted the demo to be interactive. I added a goalie you can place anywhere across the goal mouth. A small PyTorch network maps that position to four shot controls: target lane, power, tempo, and pelvis yaw.

The network is tiny on purpose. I trained it with supervised labels from MuJoCo outcomes at 25 keeper positions. On the site, you place the keeper and get a replay of the kick against it — the video is the verification rollout, not a pre-baked animation.

## What I learned

Motion imitation and physical success are separate stages. Human data gave the G1 the structure of a kick. A differentiable proxy made optimization fast. CEM search handled the contact dynamics gradients could not. MuJoCo kept every claim grounded in the same physics environment.

This is still sim work — bringing it to a physical G1 is a different battle. [A recent CMU team got a G1 to perform a banana kick on hardware](https://www.linkedin.com/posts/ding-zhao-01130730_we-have-seen-many-robot-demos-played-at-4x-ugcPost-7491644991778496512-o3QU/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFxIPCUB64_KPm0Zwrsk_jPysOtOzu8nHek), which shows how fast that gap is closing. Real hardware still adds calibration error, actuator delay, and a floor that will not forgive a faceplant.

Super fun project. I'm confident we'll see robots play real soccer within a few years.
