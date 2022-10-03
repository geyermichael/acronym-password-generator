const specialCharacters: Set<string> = new Set(['.', ',', '!']);
const replaceCharactersWithNumbers: { [key: string]: string } = {
  g: '9',
  G: '9',
  i: '1',
  I: '1',
  o: '0',
  O: '0',
  x: '10',
  X: '10',
};

export function useGeneratePassword(
  sentence: string,
  options: { useNumbers: boolean } = { useNumbers: false }
): string {
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

  if (options.useNumbers) {
    for (let i = 0; i < password.length; i++) {
      if (password[i] in replaceCharactersWithNumbers)
        password[i] = replaceCharactersWithNumbers[password[i]];
    }
  }

  return password.join(''); // return password as string;
}
