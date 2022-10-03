import { useGeneratePassword } from '../src/composables/useGeneratePassword';
import { describe, test, expect } from 'vitest';

describe('Generate Password', () => {
  test('Hello, World!', () => {
    const sentence = 'Hello, World!';
    expect(useGeneratePassword(sentence)).toBe('H,W!');
  });

  test('Fuchs du hast die Gans gestohlen, gib sie wieder her!', () => {
    const sentence = 'Fuchs du hast die Gans gestohlen, gib sie wieder her!';
    expect(useGeneratePassword(sentence)).toBe('FdhdGg,gswh!');
  });
});
