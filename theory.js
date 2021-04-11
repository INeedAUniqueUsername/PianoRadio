let root = 0,
    second = 2,
    third = 4,
    fourth = 5,
    fifth = 7, 
    sixth = 9,
    seventh = 11

let keyC = [ root, second, third, fourth, fifth, sixth, seventh ];

let I =   [root, third, fifth];
let i =   [root, third - 1, fifth];
let ii =  [second, fourth, sixth];
let iii = [third, fifth, seventh];
let IV =  [fourth, sixth, root];
let iv =  [fourth, sixth - 1, root];
let V =   [fifth, seventh, second];
let v =   [fifth, seventh - 1, second];
let vi =  [sixth, root, third];
let vii = [seventh, second, fourth];

let keyNames = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'G',
  'G#',
  'A',
  'A#',
  'B'
]
let chords = {
  'I': I,
  'i': i,
  'ii': ii,
  'iii': iii,
  'IV': IV,
  'iv': iv,
  'V': V,
  'v': v,
  'vi': vi,
  'vii': vii};

function matchesKey(keyArray, notes) {
  return notes.every(n => keyArray.includes(n));
}
function matchesChord(chordArray, notes) {
  return notes.every(n => chordArray.includes(n));
}
function getKeyArray(keyBase) {
  return keyC.map(n => (n + keyBase)%12);
}
function findKey(notes) {
  let matchCount = 0;
  let matchKey = -1;
  for(let keyBase = 0; keyBase < 12; keyBase++) {
    let keyArray = getKeyArray(keyBase);
    let count = notes.filter(n => keyArray.includes(n%12));

    if(count > matchCount) {
      matchCount = count;
      matchKey = keyBase;
    }
  }
  return matchKey;
}
function getChordArray(keyBase, chordArrayBase) {
  return chordArrayBase.map(n => (n + keyBase)%12);
}
function findChord(keyBase, notes) {
  let matchCount = 0;
  let matchChord = null;
  for(let chordName in Object.keys(chords)) {
    let chord = chords[chordName];
    let chordArray = getChordArray(keyBase, chord);
    let count = notes.filter(n => chordArray.includes(n%12));
    if(count > matchCount) {
      matchCount = count;
      matchChord = chordName;
    }
  }
  if(matchCount != notes.count) {
    
  }
}

let currentKey = 'I';
function displayInfo() {
  ctx.font = `${16}px Inconsolata`;
  ctx.textAlign = "left";
  ctx.fillStyle = 'white';
}