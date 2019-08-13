import React from 'react';
import { connect } from 'react-redux';

import Shell from '../components/Shell';
import Meta from '../components/Meta';
import SimpleCard from '../components/SimpleCard';

// ===================================================
// About page
// ===================================================
const AboutPage = ({ isDarkMode }) => (
  <>
    <Meta title='About' />
    <Shell withIcon={true}>
      <h2 className='page-title'>About</h2>
      <p className='light-sub'>
        A few word about us, our goals and our projects.
      </p>
      <SimpleCard title='Our philosophy'>
        <p style={{textAlign: 'justify'}}>
          The core goal of <strong>30 seconds</strong> is to provide a quality resource for beginner and advanced developers alike. We want to help improve the software development ecosystem, by lowering the barrier of entry for newcomers and help seasoned veterans pick up new tricks and remember old ones. 
        </p>
        <p style={{textAlign: 'justify'}}>
          In order to achieve this, we have collected hundreds of snippets that can be of use in a wide range of situations. We welcome new contributors and we like fresh ideas, as long as the code is short and easy to grasp in about 30 seconds. 
        </p>
        <p style={{textAlign: 'justify'}}>
          The only catch, if you may, is that a few of our snippets are not perfectly optimized for large, enterprise applications and they might not be deemed production-ready.
        </p>
      </SimpleCard>
      <SimpleCard title='Our story'>
        <p style={{ textAlign: 'justify' }}>
          The <strong>30 seconds</strong> movement started back in December, 2017, with the release of <a href='https://github.com/30-seconds/30-seconds-of-code' target='_blank' rel='noopener noreferrer'>30 seconds of code</a> by <a href='https://github.com/Chalarangelo' target='_blank' rel='noopener noreferrer'>Angelos Chalaris</a>. Since then, hundreds of developers have contributed snippets to over 6 repositories, creating a thriving community of people willing to help each other write better code. 
        </p>
        <p style={{ textAlign: 'justify' }}>
          In late 2018, the <a href='https://github.com/30-seconds'>30 seconds organization</a> was formed on GitHub, in order to expand upon existing projects and ensure that they will remain high-quality resources in the future.
        </p>
      </SimpleCard>
      <SimpleCard title='Who we are'>
        <p style={{ textAlign: 'justify' }}>
          The <strong>30 seconds</strong> movement and, to some extent, the associated GitHub organization consists of all the people who have invested time and ideas to be part of this amazing community. Meanwhile, these fine folks are currently responsible for maintaining the codebases and dealing with organizational matters:
        </p>
        <div className='flex-row'>
          <div class="flex-item">
            <img className='media-section' src='https://github.com/Chalarangelo.png' alt='chalarangelo' />
            <a href='https://github.com/Chalarangelo' className='button-section' target='_blank' rel='noopener noreferrer'>Angelos Chalaris</a>
          </div>
          <div class="flex-item">
            <img className='media-section' src='https://github.com/fejes713.png' alt='fejes713' />
            <a href='https://github.com/fejes713' className='button-section' target='_blank' rel='noopener noreferrer'>Stefan Fejes</a>
          </div>
          <div class="flex-item">
            <img className='media-section' src='https://github.com/flxwu.png' alt='flxwu' />
            <a href='https://github.com/flxwu' className='button-section' target='_blank' rel='noopener noreferrer'>Felix Wu</a>
          </div>
          <div class="flex-item">
            <img className='media-section' src='https://github.com/atomiks.png' alt='atomiks' />
            <a href='https://github.com/atomiks' className='button-section' target='_blank' rel='noopener noreferrer'>atomiks</a>
          </div>
        </div>
        <div className='flex-row'>
          <div class="flex-item">
            <img className='media-section' src='https://github.com/skatcat31.png' alt='skatcat31' />
            <a href='https://github.com/skatcat31' className='button-section' target='_blank' rel='noopener noreferrer'>Robert Mennell</a>
          </div>
          <div class="flex-item">
            <img className='media-section' src='https://github.com/petrovicstefanrs.png' alt='petrovicstefanrs' />
            <a href='https://github.com/petrovicstefanrs' className='button-section' target='_blank' rel='noopener noreferrer'>Stefan Petrovic</a>
          </div>
          <div class="flex-item">
            <img className='media-section' src='https://github.com/kirjs.png' alt='kirjs' />
            <a href='https://github.com/kirjs' className='button-section' target='_blank' rel='noopener noreferrer'>Kirill Cherkashin</a>
          </div>
          <div class="flex-item">
            <img className='media-section' src='https://github.com/sohelamin.png' alt='sohelamin' />
            <a href='https://github.com/sohelamin' className='button-section' target='_blank' rel='noopener noreferrer'>Sohel Amin</a>
          </div>
        </div>
      </SimpleCard>
      <SimpleCard title='License'>
        <p style={{ textAlign: 'justify' }}>
          In order for the code provided via the <strong>30 seconds</strong> projects to be as accessible and useful as possible, all of the snippets in these collections are licensed under the <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank' rel='noopener noreferrer'>CC0-1.0 License</a> meaning they are absolutely free to use in any project you like. If you like what we do, you can always credit us, but that is not mandatory.
        </p>
        <p style={{ textAlign: 'justify' }}>
          Logos, names and trademarks are not to be used without the explicit consent of the maintainers or owners of the <strong>30 seconds</strong> GitHub organization. The only exception to this is the usage of the <strong>30-seconds-of-</strong> name in open source projects, licensed under the <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank' rel='noopener noreferrer'>CC0-1.0 License</a> and hosted on GitHub, if their README and website clearly states that they are unofficial projects and in no way affiliated with the organization.
        </p>
      </SimpleCard>
    </Shell>
  </>
);

export default connect(
  state => ({
    isDarkMode: state.app.isDarkMode,
    lastPageTitle: state.app.lastPageTitle,
    lastPageUrl: state.app.lastPageUrl,
    searchQuery: state.app.searchQuery,
  }),
  null,
)(AboutPage);
