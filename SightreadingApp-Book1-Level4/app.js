let NOTES = ['D', 'G1', 'A1', 'B1', 'CS1', 'D1', 'E2', 'FS2', 'G2'];
let NOTEINTERVALS = [-12, -7, -5, -3, -1, 0, 2, 4, 5];
let CADENCENOTES = ['A1', 'CS1', 'E2'];
let CADENCEINTERVALS = [-5, -1, 2];
let CURRENT_KEY = 'D Major';
let previousNote = null;

const NOTES_DMajor = ['D', 'G1', 'A1', 'B1', 'CS1', 'D1', 'E2', 'FS2', 'G2'];
const NOTEINTERVALS_DMajor = [-12, -7, -5, -3, -1, 0, 2, 4, 5];
const CADENCENOTES_DMajor = ['A1', 'CS1', 'E2'];
const CADENCEINTERVALS_DMajor = [-5, -1, 2];

const NOTES_GMajor = ['D', 'G1', 'A1', 'B1', 'C1', 'D1', 'E2', 'FS2', 'G2'];
const NOTEINTERVALS_GMajor = [-5, 0, 2, 4, 5, 7, 9, 11, 12];
const CADENCENOTES_GMajor = ['D', 'A1'];
const CADENCEINTERVALS_GMajor = [-5, 2];

function getRandom(arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
}

function getRandomNote(notes, intervals, previousNote) {
  let note, interval;
  let attempts = 0;
  const maxAttempts = 20;
  do {
    const index = Math.round(Math.random() * (notes.length - 1));
    note = notes[index];
    interval = intervals[index];
    attempts++;
    if (attempts >= maxAttempts) {
      break;
    }
  } while (
    previousNote !== null &&
    Math.abs(interval - NOTEINTERVALS[NOTES.indexOf(previousNote)]) > 5
  );
  return note;
}

function generateMeasureImages(isFirst, isBreak, beats, meter) {
  const measure = [];
  let remaining = beats;
  const beatsConst = beats;

  beats--;
  if (isFirst) {
    beats++;
  }
  if (isFirst && beats === 4) {
    beats--; // Adjust to be one less for the first measure in 4-4 
  }

  while (remaining > 0) {
    let noteMax = Math.min(remaining, beats); 
    let duration = getRandom([...Array(noteMax).keys()].map(i => i + 1));
    let note = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    let folder = ``;
    if (duration === beatsConst) {
      folder = `images/${CURRENT_KEY}/${meter}/barline/${duration}/${note}.jpg`;
    }
    else {
      folder = `images/${CURRENT_KEY}/${meter}/internal/${duration}/${note}.jpg`;
    }
    measure.push(folder);
    previousNote = note;
    remaining -= duration;
  }
  measure[measure.length - 1] = measure[measure.length - 1].replace('/internal/', '/barline/');
  if (isFirst) {
    measure[0] = measure[0].replace('/internal/', '/start/');
    measure[0] = measure[0].replace('/barline/', '/start/');
    measure[0] = measure[0].replace(new RegExp(`\\/(${NOTES.join('|')})\\.jpg$`), '.jpg');

  }
  if (isBreak) {
    measure[0] = measure[0].replace('/internal/', '/break/');
    measure[0] = measure[0].replace('/barline/', '/break/');
  }

  return measure;
}


function generateLastMeasureImage(beats, meter) { 
  const measure = [];
  let firstDuration = getRandom([0, 1]);
  if (beats === 4) {
    firstDuration = getRandom([1, 2]);
  }
  let folder = ``;
  if (firstDuration > 0) {
    let firstNote = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    folder = `images/${CURRENT_KEY}/${meter}/internal/${firstDuration}/${firstNote}.jpg`;
    previousNote = firstNote;
    measure.push(folder);
  }
  let secondDuration = beats - firstDuration - 1;
  secondDuration = getRandom([...Array(secondDuration).keys()].map(i => i + 1));
  let secondNote = getRandomNote(CADENCENOTES, CADENCEINTERVALS, previousNote);
  folder = `images/${CURRENT_KEY}/${meter}/end/cadence/${secondDuration}/${secondNote}.jpg`;
  measure.push(folder);

  let lastDuration = beats - firstDuration - secondDuration;
  folder = `images/${CURRENT_KEY}/${meter}/end/final/${lastDuration}.jpg`;
  measure.push(folder);

  return measure;
}

function selectKey(key) {
  switch (key) {
    case 'D Major':
      NOTES = NOTES_DMajor;
      NOTEINTERVALS = NOTEINTERVALS_DMajor;
      CADENCENOTES = CADENCENOTES_DMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_DMajor;
      CURRENT_KEY = 'D Major';
      break;
    case 'G Major':
      NOTES = NOTES_GMajor;
      NOTEINTERVALS = NOTEINTERVALS_GMajor;
      CADENCENOTES = CADENCENOTES_GMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_GMajor;
      CURRENT_KEY = 'G Major';
      break;
    default:
      break;
  }
}


function generateActivity(meter) {
  previousNote = null; // Reset previous note for each activity
  const beats = meter === '3-4' ? 3 : 4;
  const row1 = document.getElementById('row1');
  const row2 = document.getElementById('row2');
  row1.innerHTML = '';
  row2.innerHTML = '';

  const rows = [row1, row2];

  for (let row = 0; row < 2; row++) {
    for (let i = 0; i < 4; i++) {
      const isFirst = row === 0 && i === 0;
      const isLast = row === 1 && i === 3;
      const isBreak = row === 1 && i === 0;

      let images;
      if (isLast) {
        images = generateLastMeasureImage(beats, meter);
      } else {
        images = generateMeasureImages(isFirst, isBreak, beats, meter);
      }
      

      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        rows[row].appendChild(img);
      });
    }
  }
}
