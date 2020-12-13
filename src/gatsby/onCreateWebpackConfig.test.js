import onCreateWebpackConfig from './onCreateWebpackConfig';

const setWebpackConfigMock = jest.fn();
const actions = {
  setWebpackConfig: setWebpackConfigMock,
};

describe('onCreateWebpackConfig', () => {
  describe('with stage equal to "develop"', () => {
    it('calls setWebpackConfig with "cheap-module-source-map"', () => {
      onCreateWebpackConfig({
        actions,
        stage: 'develop',
      });
      expect(setWebpackConfigMock).toHaveBeenCalledWith(
        expect.objectContaining({
          devtool: 'cheap-module-source-map',
        })
      );
    });
  });

  describe('with stage equal to "build-javascript"', () => {
    it('calls setWebpackConfig with false', () => {
      onCreateWebpackConfig({
        actions,
        stage: 'build-javascript',
      });
      expect(setWebpackConfigMock).toHaveBeenCalledWith(
        expect.objectContaining({
          devtool: false,
        })
      );
    });
  });

  describe('with any other stage', () => {
    it('calls setWebpackConfig with "source-map"', () => {
      onCreateWebpackConfig({
        actions,
        stage: 'something-else',
      });
      expect(setWebpackConfigMock).toHaveBeenCalledWith(
        expect.objectContaining({
          devtool: 'source-map',
        })
      );
    });
  });
});
