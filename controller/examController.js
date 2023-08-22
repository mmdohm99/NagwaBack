const testData = require("../data/TestData.json");
// get 10 elements shuffled exam API
exports.randomExam = async (req, res) => {
  const wardTypesArr = ["adjective", "adverb", "noun", "verb"];
  let randomArr = [];
  let fullyRandomize = [];

  //this functions push on from each type of words in arr to make sure that there is one of each type in the exam
  const getWordType = (type) => {
    let words = testData?.wordList?.filter((word) => word.pos === type);
    randomArr?.push(words[Math.floor(Math.random() * words?.length)]);
  };

  for (let y = 0; y < 4; y++) {
    getWordType(wardTypesArr[y]);
  }
    //this function returns a shuffled 10 elements array of data
  for (let i = 0; randomArr?.length < 10; i++) {
    let randomIndex =
      testData?.wordList[
        Math.floor(Math.random() * testData?.wordList?.length)
      ];
    randomArr?.includes(randomIndex) ? "" : randomArr?.push(randomIndex);
  }
  //this functios shuffles the arr for the last time as the previous arr has 1 of each type in the arr in order
  for (let x = 0; fullyRandomize?.length < 10; x++) {
    let randomIndex = randomArr[Math.floor(Math.random() * randomArr?.length)];
    fullyRandomize?.includes(randomIndex)
      ? ""
      : fullyRandomize?.push(randomIndex);
  }
  res?.send(fullyRandomize);
};
// post Api for getting rank by score 
exports.examResult = async (req, res) => {
  // this function takes score and return the ranks bigger than score 
  const bigerThen = testData?.scoresList?.filter(
    (score) => score < req?.body?.score
  );
  // this function calculates the rank to last 2 decimal numbers 
  const resualt = Number(
    ((bigerThen?.length * 100) / testData?.scoresList?.length).toFixed(2)
  );
  res?.send({ resualt: resualt });
};
// post api that takes the word and and answer and returns whether it is true answer or not
exports.trueOrFalse = async (req, res) => {
  const trueOrFalse = testData?.wordList?.find(
    (word) => word?.word === req?.body?.word
  );

  const mark = req?.body?.a === trueOrFalse?.pos ? true : false;
  res?.send({ mark: mark });
};
