const { createHash } = require(`crypto`)
jest.mock(`child_process`)
const { getRepositoryId, getRepoMetadata } = require(`../repository-id`)

const hash = str =>
  createHash(`sha256`)
    .update(str)
    .digest(`hex`)

describe(`Repository ID Helpers`, () => {
  it(`getRepositoryId from git`, () => {
    const cwdMockPath = `/Users/username/gatsby-site`
    const mockCwd = jest
      .spyOn(process, `cwd`)
      .mockImplementation(() => cwdMockPath)

    const { execSync } = require(`child_process`)
    const mockGitRemote = `git@github.com:user/repo.git`
    execSync.mockImplementation(() => mockGitRemote)

    const id = getRepositoryId()

    expect(id).toEqual({
      repositoryId: `git:${hash(mockGitRemote)}`,
      repositoryData: {
        provider: hash(`github.com`),
        owner: hash(`user`),
        name: hash(`repo`),
      },
    })

    mockCwd.mockRestore()
    execSync.mockRestore()
  })

  it(`getRepositoryId when git is broken`, () => {
    const cwdMockPath = `/Users/username/gatsby-site`
    const mockCwd = jest
      .spyOn(process, `cwd`)
      .mockImplementation(() => cwdMockPath)

    const { execSync } = require(`child_process`)
    execSync.mockImplementation(() => {
      throw new Error(`broken`)
    })

    const id = getRepositoryId()
    expect(id).toEqual({ repositoryId: `pwd:${hash(`gatsby-site`)}` })

    execSync.mockRestore()
    mockCwd.mockRestore()
  })

  it(`getRepositoryId when in netlify`, () => {
    const cwdMockPath = `/Users/username/gatsby-site`
    const mockGitRemote = `github.com/user/repo`
    const mockCwd = jest
      .spyOn(process, `cwd`)
      .mockImplementation(() => cwdMockPath)

    const { execSync } = require(`child_process`)
    execSync.mockImplementation(() => {
      throw new Error(`broken`)
    })

    process.env.NETLIFY = 1
    process.env.REPOSITORY_URL = `https://x-access-token:v1.6a60ab57393b6e8a11baf6435ae6f8097157033d@github.com/user/repo`

    //`https://x-access-token:v1.6xxxxxxxxxxxxxxxxx@github.com/user/repo`
    const id = getRepositoryId()
    expect(id).toEqual({
      repositoryId: `git:${hash(mockGitRemote)}`,
      repositoryData: {
        provider: hash(`github.com`),
        owner: hash(`user`),
        name: hash(`repo`),
      },
    })

    execSync.mockRestore()
    mockCwd.mockRestore()
  })
  describe(`Git repo metadata`, () => {
    ;[
      `https://github.com/user/repo.git`,
      `https://x-access-token:v1.6xxxxxxxxxxxxxxxxx@github.com/user/repo`,
      `git@github.com:user/repo.git`,
    ].map(url => {
      it(`works with github urls ${url}`, () => {
        const metadata = getRepoMetadata(url)
        expect(metadata).toEqual({
          provider: hash(`github.com`),
          owner: hash(`user`),
          name: hash(`repo`),
        })
      })
    })
  })
})
