const NOTES = ['A', 'B', 'D', 'G'];
const NOTEINTERVALS = [2, 4, -5, 0];
let previousNote = null;

function getRandom(arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
}

function getRandomNote(notes, intervals, previousNote) {
  let note, interval;
  do {
    const index = Math.round(Math.random() * (notes.length - 1));
    note = notes[index];
    interval = intervals[index];
  } while (previousNote !== null &&
           Math.abs(interval - intervals[notes.indexOf(previousNote)]) > 5
  );
  return note;
}

function generateMeasureImages(isFirst, isLast, isBreak, beats, meter) {
  const measure = [];
  let remaining = beats;

  while (remaining > 0) {
    let noteMax = Math.min(remaining, beats);
    let duration;
    do {
      duration = getRandom([...Array(noteMax).keys()].map(i => i + 1));
    } while (duration === 3);

    let note = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    let folder = ``;
    if (duration === beats) {
      folder = `images/${meter}/barline/${duration}/${note}.jpg`;
    }
    else {
      folder = `images/${meter}/internal/${duration}/${note}.jpg`;
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
  if (isLast) {
    measure[measure.length - 1] = measure[measure.length - 1].replace('/internal/', '/end/');
    measure[measure.length - 1] = measure[measure.length - 1].replace('/barline/', '/end/');
    measure[measure.length - 1] = measure[measure.length - 1].replace(new RegExp(`\\/(${NOTES.join('|')})\\.jpg$`), '.jpg');
  }
  if (isBreak) {
    measure[0] = measure[0].replace('/internal/', '/break/');
    measure[0] = measure[0].replace('/barline/', '/break/');
  }


  return measure;
}

function generateActivity() {
  const meter = '4-4'; // Default meter, can be changed as needed
  const beats = 4;
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

        images = generateMeasureImages(isFirst, isLast, isBreak, beats, meter);
      

      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        rows[row].appendChild(img);
      });
    }
  }
}
