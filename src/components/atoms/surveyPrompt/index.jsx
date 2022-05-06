const activeSurveyUrl = 'https://forms.gle/kWSfU8mcKbd8AKMb8';

export const SurveyPropmpt = () => (
  <p className='survey-prompt fs-sm md:fs-md my-8 mx-4 py-6 px-4 srfc-01dp br-md flex flex-col a-center'>
    Would you like to help us improve 30 seconds of code?
    <a
      href={activeSurveyUrl}
      className='btn outline-btn fs-sm'
      style={{ padding: '0.5rem 1rem', marginTop: '0.75rem' }}
      target='_blank'
      rel='noopener noreferrer'
    >
      Take a quick survey
    </a>
  </p>
);
