const TOTAL_BEGINNING_MEASURES = 2; // total images available in the pool
const TOTAL_INTERMEDIATE_MEASURES = 8; // total images available in the pool
const TOTAL_END_MEASURES = 1; // total images available in the pool
const NUM_TO_DISPLAY = 8;

function getRandomIndices() {
  const indices = new Set();
  indices.add(Math.floor(Math.random() * TOTAL_BEGINNING_MEASURES) + 1); // beginning
  while (indices.size < NUM_TO_DISPLAY - 1) {
    indices.add(Math.floor(Math.random() * TOTAL_INTERMEDIATE_MEASURES) + 1);
  }

const result = Array.from(indices);
result.push(Math.floor(Math.random() * TOTAL_END_MEASURES) + 1); // end
return result;
}

function displayRandomMeasures() {
  const container = document.getElementById('imageContainer');
  container.innerHTML = ''; // clear previous images
  const indices = getRandomIndices();

  var i = 0;
  while (i < indices.length) {
    const img = document.createElement('img');
    if (i === 0) {
      img.src = `images/begin${indices[i]}.png`;
      img.alt = `Measure ${indices[i]}`;
      container.appendChild(img);
      i++;
    }
    else {
    img.src = `images/measure${indices[i]}.png`;
    img.alt = `Measure ${indices[i]}`;
    container.appendChild(img);
    i++;
    }
    if (i == indices.length) {
      img.src = `images/end${indices[i - 1]}.png`;
      img.alt = `Measure ${indices[i - 1]}`;
      container.appendChild(img);
    }
  }
}
