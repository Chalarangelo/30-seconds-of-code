# media-has-caption

Providing captions for media is essential for deaf users to follow along. Captions should be a transcription or translation of the dialogue, sound effects, relevant musical cues, and other relevant audio information. Not only is this important for accessibility, but can also be useful for all users in the case that the media is unavailable (similar to `alt` text on an image when an image is unable to load).

The captions should contain all important and relevant information to understand the corresponding media. This may mean that the captions are not a 1:1 mapping of the dialogue in the media content. However, captions are *not* necessary for video components with the `muted` attribute.

### References

  1. [audio](https://dequeuniversity.com/rules/axe/2.1/audio-caption)
  1. [video](https://dequeuniversity.com/rules/axe/2.1/video-caption)

## Rule details

This rule takes one optional object argument of type object:

```json
{
    "rules": {
        "jsx-a11y/media-has-caption": [ 2, {
            "audio": [ "Audio" ],
            "video": [ "Video" ],
            "track": [ "Track" ],
          }],
    }
}
```

For the `audio`, `video`, and `track` options, these strings determine which JSX elements (**always including** their corresponding DOM element) should be used for this rule. This is a good use case when you have a wrapper component that simply renders an `audio`, `video`, or `track` element (like in React):

### Succeed
```jsx
<audio><track kind="captions" {...props} /></audio>
<video><track kind="captions" {...props} /></video>
<video muted {...props} ></video>
```

### Fail
```jsx
<audio {...props} />
<video {...props} />
```
