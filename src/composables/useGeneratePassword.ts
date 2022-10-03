const specialCharacters: Set<string> = new Set(['.', ',', '!']);

export function useGeneratePassword(sentence: string): string {
  if (sentence == '') throw new Error('Empty string is not allowed.');

  sentence = sentence.replaceAll('\n', ' ').trim(); // remove all line breaks and trim sentence
  let words: string[] = sentence.split(' ').filter((word) => word != ''); // create words array and remove all spaces

  let password: string[] = [];
  words.forEach((word) => {
    password.push(word[0]);
    if (specialCharacters.has(word[word.length - 1])) {
      password.push(word[word.length - 1]);
    }
  });

  return password.join(''); // return password as string;
}
