import { trimWhiteSpace } from './string';

const stringComparator = (str1, str2) => {
  return expect(str1.split(' ').sort()).toEqual(str2.split(' ').sort());
};

describe('trimWhiteSpace', () => {

  describe('with plain-text only', () => {
    it('should return the provided plain-text', () => {
      stringComparator(trimWhiteSpace`my-class`, 'my-class');
    });

    it('should deduplicate the provided plain-text', () => {
      stringComparator(trimWhiteSpace`my-class yada my-class`, 'my-class yada');
      stringComparator(trimWhiteSpace`my-class my-class yada`, 'my-class yada');
    });

    it('should trim the provided plain-text', () => {
      stringComparator(trimWhiteSpace`my-class  `, 'my-class');
      stringComparator(trimWhiteSpace`  my-class`, 'my-class');
      stringComparator(trimWhiteSpace`  my-class  `, 'my-class');
      stringComparator(trimWhiteSpace`my-class yada    `, 'my-class yada');
      stringComparator(trimWhiteSpace`my-class     yada`, 'my-class yada');
      stringComparator(trimWhiteSpace`  my-class yada`, 'my-class yada');
      stringComparator(trimWhiteSpace`  my-class     yada   `, 'my-class yada');
    });
  });

  describe('with interpolations only', () => {
    it('should return the provided interpolations', () => {
      stringComparator(trimWhiteSpace`${'my-class'}`, 'my-class');
    });

    it('should deduplicate the provided interpolations', () => {
      stringComparator(trimWhiteSpace`${'my-class'}${'yada'}${'my-class'}`, 'my-class yada');
      stringComparator(trimWhiteSpace`${'my-class'}${'my-class'}${'yada'}`, 'my-class yada');
    });

    it('should not return any falsey interpolations', () => {
      stringComparator(trimWhiteSpace`${'my-class'}${''}`, 'my-class');
      stringComparator(trimWhiteSpace`${'my-class'}${undefined}`, 'my-class');
      stringComparator(trimWhiteSpace`${'my-class'}${null}`, 'my-class');
      stringComparator(trimWhiteSpace`${'my-class'}${false}`, 'my-class');
    });

    it('should trim the provided interpolations', () => {
      stringComparator(trimWhiteSpace`${'my-class  '}`, 'my-class');
      stringComparator(trimWhiteSpace`${'  my-class'}`, 'my-class');
      stringComparator(trimWhiteSpace`${'  my-class  '}`, 'my-class');
      stringComparator(trimWhiteSpace`${'my-class '}${'yada    '}`, 'my-class yada');
      stringComparator(trimWhiteSpace`${'my-class  '}${'   yada'}`, 'my-class yada');
      stringComparator(trimWhiteSpace`${'  my-class '}${'yada'}`, 'my-class yada');
      stringComparator(trimWhiteSpace`${'  my-class '}${'    yada   '}`, 'my-class yada');
    });

    it('should tokenize the provided interpolations', () => {
      stringComparator(trimWhiteSpace`${'my-class  yada '}`, 'my-class yada');
      stringComparator(trimWhiteSpace`${'my-class'}${'yada yoda'}`, 'my-class yada yoda');
      stringComparator(trimWhiteSpace`${'my-class yada'}${'yada'}`, 'my-class yada');
      stringComparator(trimWhiteSpace`${'my-class yada yada'}${'yoda'}`, 'my-class yada yoda');
    });
  });

  describe('with plain-text and interpolations', () => {
    it('should return the combined result', () => {
      stringComparator(trimWhiteSpace`yada ${'my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`yada ${'my-class'} yoda`, 'yada yoda my-class');
      stringComparator(trimWhiteSpace`${'my-class'} yoda`, 'yoda my-class');
      stringComparator(trimWhiteSpace`${'my-class'} yoda ${'yada'}`, 'my-class yoda yada');
      stringComparator(trimWhiteSpace`a ${'my-class'} yoda ${'yada'} b`, 'a my-class yoda yada b');
      stringComparator(trimWhiteSpace`a c ${'my-class'}${'d'} yoda ${'yada'} b`, 'a c my-class d yoda yada b');
    });

    it('should deduplicate the combined result', () => {
      stringComparator(trimWhiteSpace`yada yada ${'my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`yada ${'my-class my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`yada ${'yada my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`yada my-class ${'my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`yada yada my-class ${'my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`yada ${'my-class yada my-class'}`, 'yada my-class');
    });

    it('should trim the combined result', () => {
      stringComparator(trimWhiteSpace`yada    ${'my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`yada ${'my-class    '}`, 'yada my-class');
      stringComparator(trimWhiteSpace`   yada ${'my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`   yada   ${'  my-class '}  `, 'yada my-class');
      stringComparator(trimWhiteSpace`   yada   ${'  my-class '}  yoda`, 'yada my-class yoda');
      stringComparator(trimWhiteSpace`   yada   ${'  my-class '}  yoda  ${'a'}`, 'a yada my-class yoda');
    });

    it('should not return any falsey interpolations', () => {
      stringComparator(trimWhiteSpace`yada ${'my-class'} ${null}`, 'yada my-class');
      stringComparator(trimWhiteSpace`yada ${'my-class'} ${undefined}`, 'yada my-class');
      stringComparator(trimWhiteSpace`yada ${false} ${'my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`${undefined} yada ${'my-class'}`, 'yada my-class');
      stringComparator(trimWhiteSpace`${''} yada ${undefined} ${null}${'my-class'} ${false}`, 'yada my-class');
    });
  });
});
