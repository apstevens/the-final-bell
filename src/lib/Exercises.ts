type Exercise = {
  id: string;
  name: string;
  category: string;
  youtube?: string;
  cues?: string[];
};

const EXERCISES: Exercise[] = [
  {
    id: "ex1",
    name: "2-3-2 on Heavy Bag",
    category: "bag",
    youtube: "https://youtu.be/9eOBnIq07bQ?si=ZV_h-thd8iWxbOVo",
    cues: ["Hands up", "Rotate the hip", "Exhale on impact"],
  },
  {
    id: "ex2",
    name: "Switch Kick Drills",
    category: "pad",
    youtube: "https://youtu.be/saN1yQqFdx8?si=QGXlWjHoKK4YTdJN",
    cues: ["Step across", "Turn the hip over", "Guard returns fast"],
  },
  {
    id: "ex3",
    name: "Goblet Squat",
    category: "strength",
    youtube: "https://youtu.be/gCESNsDsbqk?si=8OrXr06ei7v19PZ4",
    cues: ["Chest up", "Knees out", "Drive through heels"],
  },
  {
    id: "ex4",
    name: "DB One-Arm Hang Snatch",
    category: "strength",
    youtube: "https://youtu.be/A8QRJoPiCyY?si=dh-LOQUu5uUB8mxb",
    cues: ["One DB in overhand grip, arm hanging straight",
        "Explode off the ground, shrug shoulder",
        "Triple extension through ankles/knees/hips",
        "Catch with loud heels, knees bent, arm straight overhead"]
  }
];

export default EXERCISES;