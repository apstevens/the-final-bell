type Assignment = {
  id: string;
  date: string;
  exercises: {
    exerciseId: string;
    rounds?: number;
    sets?: number;
    reps?: number;
    seconds?: number;
  }[];
};


const TODAY: Assignment = {
  id: "wk1",
  date: new Date().toISOString().slice(0, 10),
  exercises: [
    { exerciseId: "ex1", rounds: 3, seconds: 180 },
    { exerciseId: "ex2", rounds: 3, seconds: 120 },
    { exerciseId: "ex3", sets: 3, reps: 10 },
    { exerciseId: "ex4", sets: 3, reps: 6 },
  ],
};

export default TODAY;