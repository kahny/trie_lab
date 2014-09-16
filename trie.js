// this is a constructor
Trie = function(){
  this.characters = {};
};

Trie.prototype.learn = function(word, index){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.

  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.


  if (index === undefined) {
    index = 0;
  };
  if(word.length === index){
    this.isWord = true;
  } else {
    if(this.characters[word[index]] === undefined){
      this.characters[word[index] ] = new Trie();
      this.characters[word[index]].learn(word, index+1);
    } else {
      this.characters[word[index]].learn(word, index+1); //if we have that letter
    }
  }
};
//words array is empty, currentword is string
Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  if (words === undefined){
    words = []
  }
  if (currentWord === undefined){
    currentWord = ""
  }
  if (this.isWord === true){
    words.push(currentWord)
  }
  for (var letter in this.characters){
    this.characters[letter].getWords(words, currentWord + letter)
  }
  return words
};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.
  if (index === undefined) {
    index = 0;
  }
  if (this.characters[word[index]] === undefined){
    return false;
  } else{
    //of you are on the last character of the word
    if (index===(word.length-1)){
      return this.characters[word[index]];
    }
    else{
      return this.characters[word[index]].find(word, index+1);
    }
  }
  // Be sure to consider what happens if the word is not in this Trie.
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions
  // for a given prefix.
  // It should use find and getWords.

  var allWords = this.getWords();  //array of words, loop through each word in array and check if prefix matches it, if so return word
  var autoCompleted = [];

  for (var wordIndex in this.getWords()){ //wordIndex returns the word index
    var count = 0;
    var word = allWords[wordIndex]
    for (var i =0; i < prefix.length ; i++){
      if (prefix[i] !== word[i]) {
        count += 1;
      }
    }
    if (count === 0){
      autoCompleted.push(word);
    }
  }

  return autoCompleted;
};

try{
  module.exports = Trie
} catch(e){

}