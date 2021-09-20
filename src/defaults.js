// Exercise types & details
export const exerciseTypes = [
	{ id: 1, name: 'Jogging', avgSpeed: 0, avgDistance: 0, avgCalories: 0 },
	{ id: 2, name: 'Swimming', avgSpeed: 0, avgDistance: 0, avgCalories: 0 },
	{ id: 3, name: 'Running', avgSpeed: 0, avgDistance: 0, avgCalories: 0 },
	{ id: 4, name: 'Skipping', avgSpeed: 0, avgDistance: 0, avgCalories: 0 },
	{ id: 5, name: 'Cycling', avgSpeed: 0, avgDistance: 0, avgCalories: 0 },
];


// Local storage db functions
export function localDb(t, k, v) {
  if (t === "get") {
    if (localStorage.getItem(k)) {
      return JSON.parse(localStorage.getItem(k));
    }
  }
  if (t === "set") {
    localStorage.setItem(k, JSON.stringify(v));
  }
  if (t === "remove") {
    localStorage.removeItem(k);
  }
  if (t === 'reset') {
    localStorage.removeItem('timer');
    localStorage.setItem('exercise', null);
  }
};