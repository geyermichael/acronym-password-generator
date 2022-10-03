import { useGeneratePassword } from '../src/composables/useGeneratePassword';
import { describe, test, expect } from 'vitest';

describe('Generate Password', () => {
  test('Simple test', () => {
    const sentence = 'Hello, World!';
    expect(useGeneratePassword(sentence)).toBe('H,W!');
  });

  test('Password generated using simple sentence.', () => {
    const sentence = 'Fuchs du hast die Gans gestohlen, gib sie wieder her!';
    expect(useGeneratePassword(sentence)).toBe('FdhdGg,gswh!');
  });

  test('Password generated using simple sentence and numbers', () => {
    const sentence = 'Fuchs du hast die Gans gestohlen, gib sie wieder her!';
    expect(useGeneratePassword(sentence, { useNumbers: true })).toBe(
      'Fdhd99,9swh!'
    );
  });
});
