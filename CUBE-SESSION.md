# Sub-X: cube work from this session

Everything here was added to Sub-X in this session. Every algorithm was checked in Sub-X's cube model before it went in.

## F2L: all 41 cases

Learn had 23 of the 41 standard F2L cases. The 18 missing ones are added as **F2L 24–41**, so the 23 you knew keep their names and "learned" marks. All 41 are now sorted into the standard groups. Each algorithm solves the front-right pair with yellow on top and green in front, and keeps the cross and the other three pairs.

**Basic inserts**

| Case | Algorithm |
| --- | --- |
| F2L 1 | `U R U' R'` |
| F2L 2 | `U' F' U F` |
| F2L 3 | `R U R'` |
| F2L 4 | `F' U' F` |

**Both on top · white sticker facing the side**

| Case | Algorithm |
| --- | --- |
| F2L 5 | `U' R U R' U2 R U' R'` |
| F2L 6 | `U F' U' F U2 F' U F` |
| F2L 7 | `U' R U2 R' U2 R U' R'` |
| F2L 8 | `U F' U2 F U2 F' U F` |
| F2L 9 | `U' R U' R' U R U R'` |
| F2L 10 | `U F' U F U' F' U' F` |
| F2L 26 (new) | `R U' R' U' R U R'` |
| F2L 27 (new) | `R U' R' U F' U' F` |
| F2L 30 (new) | `F' U F U2 R U R'` |
| F2L 33 (new) | `F' U2 F U' R U R'` |
| F2L 36 (new) | `R U2 R' U F' U' F` |
| F2L 38 (new) | `R U' R' U2 F' U' F` |

**Both on top · white sticker facing up**

| Case | Algorithm |
| --- | --- |
| F2L 11 | `R U2 R' U' R U R'` |
| F2L 12 | `F' U2 F U F' U' F` |
| F2L 13 | `U R U2 R' U R U' R'` |
| F2L 14 | `U' F' U2 F U' F' U F` |
| F2L 24 (new) | `R U R' U R U' R'` |
| F2L 25 (new) | `R U R' F' U' F` |
| F2L 31 (new) | `R2 U2 R' U' R U' R2` |
| F2L 35 (new) | `F2 U2 F U F' U F2` |

**Corner in the slot, edge on top**

| Case | Algorithm |
| --- | --- |
| F2L 15 | `U R U' R' U' F' U F` |
| F2L 16 | `U' F' U F U R U' R'` |
| F2L 17 | `R U' R' U R U' R'` |
| F2L 18 | `R U R' U' R U R'` |
| F2L 37 (new) | `R U' R' F' U' F` |
| F2L 39 (new) | `R U2 R' F' U2 F` |

**Edge in the slot, corner on top**

| Case | Algorithm |
| --- | --- |
| F2L 21 | `R U R' U' R U R' U' R U R'` |
| F2L 22 | `R U' R' F' U2 F` |
| F2L 28 (new) | `R U R' U2 R U R'` |
| F2L 29 (new) | `F' U' F U' R U R'` |
| F2L 32 (new) | `R U' R' U2 R U' R'` |
| F2L 34 (new) | `R U R' U F' U' F` |

**Both in the slot**

| Case | Algorithm |
| --- | --- |
| F2L 19 | `R U' R' U' R U R' U2 R U' R'` |
| F2L 20 | `R U' R' U R U2 R' U R U' R'` |
| F2L 23 | `R2 U2 F R2 F' U2 R' U R'` |
| F2L 40 (new) | `R F U R U' R' F' U' R'` |
| F2L 41 (new) | `R U F R U R' U' F' R'` |

## COLL: all 40 cases

COLL is for when the top edges are already oriented (a yellow cross on top). One algorithm makes the top yellow and solves the corners, which leaves only an edge PLL (Ua, Ub, H or Z), or nothing at all. The cases are grouped by the shape of the yellow corners: H has 4, and Pi, U, T, L, Sune and Antisune have 6 each.

About a third of these were found by computer search rather than taken from standard COLL lists. They're correct but may not match the ones on popular COLL sheets. U 6 is the longest: two shorter algorithms joined together, 16 moves.

**H**

| Case | Algorithm |
| --- | --- |
| H 1 | `R U2 R' U' R U R' U' R U' R'` |
| H 2 | `R' F2 R2 U2 R' F2 R U2 R2 F2 R` |
| H 3 | `R U R' U R U L' U R' U' L` |
| H 4 | `F R U' R' U R U2 R' U' R U R' U' F'` |

**Pi**

| Case | Algorithm |
| --- | --- |
| Pi 1 | `R U2 R2 U' R2 U' R2 U2 R` |
| Pi 2 | `L F2 U' F2 U F2 U R L' U2 R'` |
| Pi 3 | `L U' R' U L' U R U R' U R` |
| Pi 4 | `R U R' U F2 R U2 R' U2 R' F2 R` |
| Pi 5 | `F' R U F2 R' U R U' F2 U' R' F` |
| Pi 6 | `F U R U' R' U R U' R2 F' R U R U' R'` |

**U**

| Case | Algorithm |
| --- | --- |
| U 1 | `R2 D' R U2 R' D R U2 R` |
| U 2 | `R2 D R' U2 R D' R' U2 R'` |
| U 3 | `F U2 F' R F R' U2 R F' R'` |
| U 4 | `R' U2 R F U' R' U' R U F'` |
| U 5 | `R' U' R U' R' U2 R2 U R' U R U2 R'` |
| U 6 | `R U2 R' U' R U' R' L2 D L' U2 L D' L' U2 L'` |

**T**

| Case | Algorithm |
| --- | --- |
| T 1 | `R' F' r U R U' r' F` |
| T 2 | `r U R' U' r' F R F'` |
| T 3 | `F' R' F U2 F' R F R' U2 R` |
| T 4 | `R' U R U2 R' L' U R U' L` |
| T 5 | `R2 U' R U F' U2 R' U2 R F U' R` |
| T 6 | `R U2 R' U' R U' R2 U2 R U R' U R` |

**L**

| Case | Algorithm |
| --- | --- |
| L 1 | `F R' F' r U R U' r'` |
| L 2 | `F' r U R' U' r' F R` |
| L 3 | `R U2 R D R' U2 R D' R2` |
| L 4 | `R' U2 R' D' R U2 R' D R2` |
| L 5 | `R U2 L' R' U R U' L U2 R'` |
| L 6 | `R U R' U R U' R' U R U' R' U R U2 R'` |

**Sune**

| Case | Algorithm |
| --- | --- |
| Sune 1 | `R U R' U R U2 R'` |
| Sune 2 | `R U' L' U R' U' L` |
| Sune 3 | `L' R U R' U' L U2 R U2 R'` |
| Sune 4 | `R' U2 R U F R' U R U' F'` |
| Sune 5 | `F R' U2 R F' R' F U2 F' R` |
| Sune 6 | `R' U2 L U' R U L' U R' U R` |

**Antisune**

| Case | Algorithm |
| --- | --- |
| Antisune 1 | `R U2 R' U' R U' R'` |
| Antisune 2 | `R' U L U' R U L'` |
| Antisune 3 | `F U R' U' R F' U' R' U2 R` |
| Antisune 4 | `R' F U2 F' R F R' U2 R F'` |
| Antisune 5 | `R U2 R' U2 L' U R U' R' L` |
| Antisune 6 | `R' U' R U' L U' R' U L' U2 R` |

### ZBLL cases

The COLL trainer has a **Random edges (ZBLL cases)** option. It mixes up the edges as well, so you get every one of the 472 ZBLL cases, and you solve them the two-look way: the COLL, then an edge PLL. After you reveal the case, the trainer tells you which edge PLL is left and the U turn before it. Full one-look ZBLL algorithms aren't included.

## Trainers

- **Times saved per case.** The F2L, OLL, PLL and COLL trainers keep your last 12 recognition and solve times for every case. These are included in backups.
- **Your slowest cases.** Each trainer lists your 5 slowest cases, each with a **Practise** button.
- **My slowest.** A new option that drills only those cases.

## Roux trainers with a smart cube

A smart cube reports an M move as two face turns (R and L'). Before the fix, the trainers thought you'd gone off the setup after the first half, so moves weren't crossed out until the second half arrived. An M2 showed three wrong "off the setup" messages in a row.

- A move that takes more than one turn on the cube (M, M2, U2) now shows as half done, in either order, and is crossed out as soon as it's complete.
- LSE now finishes when every face is one colour. Before, the trainer could miss the finish, because M moves leave the cube thinking it's turned over.
- Turns are counted the usual way: R2, M and M2 each count as one. While you solve, the trainer shows the count after every turn. This also fixes the inflated turns and TPS in the Roux trainers.

This was tested with a simulated cube on all four Roux trainers (first block, second block, CMLL, LSE). It hasn't been tried on a real cube yet: an LSE case is the best first test.

## Timer and stats

- **Trend chart:** shows singles, ao5 and ao12, with a dot on each new PB. Switch between the last 50, the last 100 or all solves. A note compares your ao12 with the one 12 solves earlier.
- **Smart-cube step bars:** recent smart-cube solves get a bar each, split into cross, F2L, OLL and PLL, so you can see which step is getting faster.
- **csTimer import:** **Restore or import** now also takes csTimer exports. Each csTimer session becomes a Sub-X session with the same scramble type, and importing the same file twice doesn't duplicate solves.
- **Daily 5:** a scramble mode with five scrambles a day that are the same for everyone. Finish all five for your daily ao5.
- **Share:** sends a link that opens Sub-X on the same scramble, so a friend can race you from anywhere.
- **Race a friend:** two timers on one screen with the same scramble. Hold your side, let go to start, and touch it again to stop. On a keyboard, player 1 uses A and player 2 uses L. On a phone, player 1's side is upside down so it faces the other person.
